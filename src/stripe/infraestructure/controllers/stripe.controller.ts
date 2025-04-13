import {
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import Stripe from 'stripe';
import { WebhookUseCase } from 'src/stripe/application/use-cases/webhook';
import { ConfigService } from '@nestjs/config';

@Controller('payments')
export class StripeController {
  private stripe: Stripe;

  constructor(
    private readonly webhookUseCase: WebhookUseCase,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-03-31.basil',
    });
  }

  @Post('webhook')
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('❌ Error verificando firma del webhook:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`✅ Evento recibido: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      try {
        const session = event.data.object as Stripe.Checkout.Session;

        // Validar y procesar los datos del webhook
        if (!session.metadata) {
          throw new Error('Metadata no está presente en la sesión');
        }

        console.log('✅ Sesión completada:', session);

        // Validar campos en metadata
        const userId = parseInt(session.metadata.userId);
        const subtotal = parseFloat(session.metadata.subtotal);
        const iva = parseFloat(session.metadata.iva);
        const total = parseFloat(session.metadata.total);

        if (!session.metadata.products) {
          throw new Error('Products no están presentes en metadata');
        }

        let items;
        try {
          items = JSON.parse(session.metadata.products); // Cambia "items" por "products"
        } catch (err) {
          throw new Error('Error al parsear products en metadata: ' + err.message);
        }

        if (!userId || !subtotal || !iva || !total || !Array.isArray(items)) {
          throw new Error('Datos inválidos en metadata');
        }

        // Ejecutar el caso de uso con los datos validados
        await this.webhookUseCase.execute({
          userId,
          addressId: 2, // Usar un addressId estático
          subtotal,
          iva,
          total,
          items,
        });

        console.log('✅ Pedido creado exitosamente');
      } catch (error) {
        console.error('❌ Error en webhookUseCase:', error);
        return res.status(500).send('Internal error');
      }
    }

    return res.status(200).send('Webhook recibido');
  }
}