import { Injectable, NestMiddleware } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ProductsService } from './apis/products/products.service';

@Injectable()
export class ResetMiddleware implements NestMiddleware {
  constructor(
    private readonly scheduleRegistry: SchedulerRegistry,
    private readonly productsService: ProductsService,
  ) {}
  use(req: any, res: any, next: () => void) {
    console.log('미들웨어가 실행되었씁니다');
    next();
  }
}
