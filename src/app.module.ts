import { Module } from '@nestjs/common';
import { ProductsModule } from './products/productos.module';
import { AuthModule } from './auth/autentification.module';

@Module({
  imports: [ProductsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
