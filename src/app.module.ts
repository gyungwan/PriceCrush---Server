import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './apis/fileupload/fileupload.module';
import { ProductsModule } from './apis/products/products.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { ProductCategoryModule } from './apis/product-category/product-category.module';
import { ProductImageModule } from './apis/productImage/productImage.module';
import { AuctionModule } from './apis/auction/auction.module';
import { jwtAccessStrategy } from './common/auth/jwt-access.strategy';
import { jwtRefreshStrategy } from './common/auth/jwt-refresh.strategy';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    FileModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    ScheduleModule.forRoot(),
    ProductImageModule,
    ProductsModule,
    AuthModule,
    UsersModule,
    ProductCategoryModule,
    AuctionModule,
  ],
  controllers: [AppController],
  providers: [AppService, jwtAccessStrategy, jwtRefreshStrategy],
})
export class AppModule {
  constructor(private readonly appService: AppService) {}
  async onModuleInit() {
    await this.appService.reset();
  }
}
