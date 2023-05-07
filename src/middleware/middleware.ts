import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ProductsService } from 'src/apis/products/products.service';

@Injectable()
export class MyMiddleware implements OnModuleInit {
  constructor(
    private readonly productsService: ProductsService,
    private readonly scheduleRegistry: SchedulerRegistry,
  ) {}
  async onModuleInit() {
    console.log('경매 알림 cron을 재등록합니다.');
    // end_date가 현재 시간보다 이전인 상품들을 가져온다.

    const products = await this.productsService.findBeforeEnd();
    console.log(products);
    this.scheduleRegistry.addCronJob('0 0 12 5 5 *', () =>
      console.log('Hello every May 5th 12:00:00'),
    );
    // ... add other cron jobs
  }
}
