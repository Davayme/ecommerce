
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateStripeSessionDto } from '../application/dto/create-stripe-session.dto';
import { CreateStripeSessionUseCase } from '../application/use-cases/create-stripe-session';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly createStripeSessionUseCase: CreateStripeSessionUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-session')
  async createSession(@Body() dto: CreateStripeSessionDto,  @Req() req: any,) {
    return await this.createStripeSessionUseCase.execute(dto, req.user.userId);
  }
}
