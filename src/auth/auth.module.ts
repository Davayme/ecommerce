import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegisterUserUseCase } from './application/use-cases/register-user';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { PrismaUserRepository } from './infrastructure/database/prisma-user.repository';

@Module({
    imports: [PrismaModule],
    providers: [
        RegisterUserUseCase,
        {
          provide: 'IUserRepository', // Vincula la interfaz a la implementación
          useClass: PrismaUserRepository,
        },
      ],
    controllers: [AuthController],
    
})
export class AuthModule {

}
