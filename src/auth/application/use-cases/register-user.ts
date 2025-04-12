import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { IUserRepository } from '../../domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class RegisterUserUseCase {
  constructor(@Inject('IUserRepository') private readonly userRepo: IUserRepository) {}

  async execute(dto: RegisterUserDto): Promise<void> {
    const existingUser = await this.userRepo.findByEmail(dto.email);
    if (existingUser) throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user: Omit<User, 'id'> = {
      
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      roleId: 2,
      createdAt: new Date()
      
    };

    await this.userRepo.save(user);
  }
}