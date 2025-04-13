import { Module } from '@nestjs/common';
import { StripeService } from './application/stripe/stripe.service';

@Module({
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
