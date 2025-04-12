// src/infrastructure/controllers/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/auth/application/use-cases/register-user';
import { RegisterUserDto } from '../../application/dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    await this.registerUser.execute(dto);
    return {
      message: 'User registered successfully',
    };
  }
}
