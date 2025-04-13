import { Module } from '@nestjs/common';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
    imports: [StripeModule]
})
export class PaymentsModule {}
