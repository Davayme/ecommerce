import { Module } from '@nestjs/common';
import { StripeService } from './application/stripe/stripe.service';
import { JwtAuthModule } from 'src/common/auth/jwt-auth.module';
import { StripeController } from './infraestructure/controllers/stripe.controller';
import { WebhookUseCase } from './application/use-cases/webhook';
import { OrderRepository } from './infraestructure/repositories/stripe-order-repositorie';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [StripeService,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
    WebhookUseCase,
    
  ],
  exports: [StripeService],
  imports: [JwtAuthModule, PrismaModule, ConfigModule],
  controllers: [StripeController],
})
export class StripeModule { }
