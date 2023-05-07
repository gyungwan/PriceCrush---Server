import { Injectable } from '@nestjs/common';
import { ProductsService } from './apis/products/products.service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    private readonly ProductsService: ProductsService,
    private readonly scheduleRegistry: SchedulerRegistry,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async reset() {
    console.log('경매 알림 cron을 재등록합니다.');
    // end_date가 현재 시간보다 이전인 상품들을 가져온다.

    const products = await this.ProductsService.findBeforeEnd();
    console.log(products);
    this.scheduleRegistry.addCronJob('0 0 12 5 5 *', () =>
      console.log('Hello every May 5th 12:00:00'),
    );
    // ... add other cron jobs
  }
}
