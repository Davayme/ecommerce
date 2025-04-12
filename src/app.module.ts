import { Module } from '@nestjs/common';
import { ProductsModule } from './products/productos.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductsModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
