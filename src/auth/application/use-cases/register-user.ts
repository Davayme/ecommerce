import { Inject, Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { IUserRepository } from '../../domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class RegisterUserUseCase {
  constructor(@Inject('IUserRepository') private readonly userRepo: IUserRepository) {}

  async execute(dto: RegisterUserDto): Promise<void> {
    try {
      const existingUser = await this.userRepo.findByEmail(dto.email);
      if (existingUser) {
        throw new BadRequestException('El correo electrónico ya está registrado');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user: Omit<User, 'id'> = {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        roleId: 2,
        createdAt: new Date(),
      };

      await this.userRepo.save(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Re-lanzar excepciones controladas
      }
      // Manejar errores inesperados
      throw new InternalServerErrorException('Ocurrió un error al registrar el usuario');
    }
  }
}