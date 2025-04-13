import { Module } from '@nestjs/common';
import { ProductsModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentsModule } from './payments/payments.module';
import { JwtAuthModule } from './common/auth/jwt-auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [ProductsModule, AuthModule, PrismaModule, StripeModule, PaymentsModule, JwtAuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
