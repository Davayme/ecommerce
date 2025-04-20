import { Module } from '@nestjs/common';
import { StripeModule } from 'src/stripe/stripe.module';
import { CreateStripeSessionUseCase } from './application/use-cases/create-stripe-session';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentsController } from './controllers/payments.controller';
import { JwtAuthModule } from 'src/common/auth/jwt-auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, StripeModule, PrismaModule,  JwtAuthModule],
    providers: [CreateStripeSessionUseCase],
    controllers: [PaymentsController],
})
export class PaymentsModule {}
