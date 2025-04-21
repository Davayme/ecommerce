// modules/stripe/infrastructure/prisma/order.repository.ts

import { PrismaService } from 'src/prisma/prisma.service';
import { IOrderRepository } from 'src/stripe/domain/repositories/order-repository';
import { CreateOrderFromStripeDTO } from 'src/stripe/application/dto/create-order-from-stripe.dto';
import { Order } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(dto: CreateOrderFromStripeDTO): Promise<Order> {
    const order = await this.prisma.order.create({
      data: {
        userId: dto.userId,
        addressId: dto.addressId,
        subtotal: dto.subtotal,
        iva: dto.iva,
        total: dto.total,
        status: 'PAID',
        items: {
          create: dto.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
          })),
        },
      },
      include: { items: true },
    });

    for (const item of dto.items) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity, // Disminuir el stock
          },
        },
      });
    }
    return order;
  }
}