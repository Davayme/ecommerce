// modules/stripe/application/use-cases/create-session.use-case.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { StripeService } from 'src/stripe/application/stripe/stripe.service';
import { CreateStripeSessionDto } from '../dto/create-stripe-session.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreateStripeSessionUseCase {
  constructor(
    private readonly stripeService: StripeService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) { }

  async execute(dto: CreateStripeSessionDto, userId: number) {
    try {
      const stripe = this.stripeService.getInstance();
      const YOUR_DOMAIN = this.configService.get('FRONTEND_DOMAIN') || 'http://localhost:3000';

      // 1. Obtener todos los productos con sus datos reales
      const productIds = dto.products.map(p => p.productId);
      const dbProducts = await this.prisma.product.findMany({
        where: { id: { in: productIds }, status: true },
        select: { id: true, name: true, price: true, stock: true }
      });

      if (dbProducts.length !== dto.products.length) {
        throw new NotFoundException('Uno o más productos no existen o están inactivos.');
      }

      // 2. Validar stock y construir carrito real
      const cart = dto.products.map((p) => {
        const dbProduct = dbProducts.find(dp => dp.id === p.productId);
        if (!dbProduct) throw new NotFoundException(`Producto con ID ${p.productId} no encontrado.`);
        if (p.quantity > dbProduct.stock) {
          throw new BadRequestException(`Stock insuficiente para ${dbProduct.name}.`);
        }

        return {
          productId: dbProduct.id,
          name: dbProduct.name,
          quantity: p.quantity,
          price: dbProduct.price,
          total: +(dbProduct.price * p.quantity).toFixed(2)
        };
      });

      // 3. Calcular totales
      const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
      const iva = +(subtotal * 0.12).toFixed(2);
      const total = +(subtotal + iva).toFixed(2);

      // 4. Crear sesión de Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cart.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        metadata: {
          userId: String(userId),
          subtotal: subtotal.toFixed(2),
          iva: iva.toFixed(2),
          total: total.toFixed(2),
          addressId: 1, // Cambiar por el ID real de la dirección del usuario
          products: JSON.stringify(cart.map(({ productId, quantity, price }) => ({
            productId,
            quantity,
            price
          }))),
        },
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
      });

      return { url: session.url, id: session.id, total, iva, subtotal, userId };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
