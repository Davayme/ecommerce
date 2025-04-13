import { CreateOrderFromStripeDTO } from 'src/stripe/application/dto/create-order-from-stripe.dto';
import { Order } from '@prisma/client';

export interface IOrderRepository {
  createOrder(dto: CreateOrderFromStripeDTO): Promise<Order>;
}