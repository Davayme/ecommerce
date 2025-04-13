import { Module } from '@nestjs/common';
import { ProductsModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ProductsModule, AuthModule, PrismaModule, StripeModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
