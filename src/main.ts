import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { ResetMiddleware } from './notireset.middleware';
// import { MyMiddleware } from './middleware/middleware';

// async function registerCronJobs(
//   scheduleRegistry?: SchedulerRegistry,
//   productsService?: ProductsService,
// ) {
//   console.log('경매 알림 cron을 재등록합니다.');
//   // end_date가 현재 시간보다 이전인 상품들을 가져온다.

//   const products = await productsService.findBeforeEnd();
//   console.log(products);
//   scheduleRegistry.addCronJob('0 0 12 5 5 *', () =>
//     console.log('Hello every May 5th 12:00:00'),
//   );
//   // ... add other cron jobs
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.enableCors({
    origin: ['https://price-crush-client.vercel.app', 'http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('PriceCrush')
    .setDescription('The PriceCrush API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.use(MyMiddleware);

  console.log('hi');
  await app.listen(3000);
}
bootstrap();
