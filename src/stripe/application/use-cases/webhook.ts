import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/stripe/domain/repositories/order-repository';
import { CreateOrderFromStripeDTO } from '../dto/create-order-from-stripe.dto';

@Injectable()
export class WebhookUseCase {
  constructor(
    @Inject('IOrderRepository') private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(dto: CreateOrderFromStripeDTO) {
    try {


      const order = await this.orderRepository.createOrder(dto);
      return order;
    } catch (error) {
      console.error('❌ Error al procesar el pedido:', error);
      throw new Error('Error processing order');
    }
  }
}