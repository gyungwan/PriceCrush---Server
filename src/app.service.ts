import { Injectable } from '@nestjs/common';
import { ProductsService } from './apis/products/products.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class AppService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async reset() {
    console.log('경매 알림 cron을 재등록합니다.');
    // end_date가 현재 시간보다 이전인 상품들을 가져온다.

    const products = await this.productsService.findBeforeEnd();
    console.log(products);
    products.forEach((product) => {
      try {
        this.schedulerRegistry.deleteCronJob(product.id.toString());
      } catch (e) {
        console.log(e);
      }
      // cron에 세팅할 end_date time formatting
      console.log(product.end_date);
      const endDate = new Date(product.end_date);
      // 서버시간에 맞추기
      const notiDate = new Date(endDate.getTime() - 1000 * 60 * 60 * 9);
      console.log(new Date());
      const endMonth = notiDate.getMonth();
      const endDay = notiDate.getDate();
      const endHour = notiDate.getHours();
      const endMinute = notiDate.getMinutes();
      const endSecond = notiDate.getSeconds();
      const endTime = `${endSecond} ${endMinute} ${endHour} ${endDay} ${endMonth} *`;
      console.log(endTime);

      const job = new CronJob(endTime, () => {
        console.log('end_date가 되어 경매를 종료합니다.');
        this.productsService.notification({ productId: product.id });
      });
      this.schedulerRegistry.addCronJob(product.id, job);
      job.start();
    });
  }
}
