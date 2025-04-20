// src/infrastructure/controllers/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/auth/application/use-cases/register-user';
import { RegisterUserDto } from '../../application/dto/register-user.dto';
import { LoginUserDto } from 'src/auth/application/dto/login-user.dto';
import { LoginUserUseCase } from 'src/auth/application/use-cases/login-user';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUser: RegisterUserUseCase, private readonly loginUser: LoginUserUseCase, private readonly jwtService: JwtService) { }

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    await this.registerUser.execute(dto);
    return {
      message: 'Usuario registrado exitosamente',
    };
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    const user = await this.loginUser.execute(dto.email, dto.password);

    const payload = {
      sub: user.id,
      email: user.email,
      roleId: user.roleId,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }
}
