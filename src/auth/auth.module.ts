import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegisterUserUseCase } from './application/use-cases/register-user';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { PrismaUserRepository } from './infrastructure/database/prisma-user.repository';
import { LoginUserUseCase } from './application/use-cases/login-user';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    }),
  })],
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
