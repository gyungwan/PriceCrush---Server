import { Module } from '@nestjs/common';
import { MyMiddleware } from './middleware';
import { ProductsModule } from 'src/apis/products/products.module';

@Module({
  imports: [ProductsModule],
  providers: [MyMiddleware],
})
export class MiddlewareModule {}
