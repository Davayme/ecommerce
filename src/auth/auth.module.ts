import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegisterUserUseCase } from './application/use-cases/register-user';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { PrismaUserRepository } from './infrastructure/database/prisma-user.repository';
import { LoginUserUseCase } from './application/use-cases/login-user';

@Module({
    imports: [PrismaModule],
    providers: [
        RegisterUserUseCase,
        {
          provide: 'IUserRepository', 
          useClass: PrismaUserRepository,
        },
        LoginUserUseCase,
   
      ],
    controllers: [AuthController],
    
})
export class AuthModule {

}
