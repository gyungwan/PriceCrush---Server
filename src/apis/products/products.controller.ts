import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  Request,
  UseGuards,
  UseInterceptors,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductInput } from './dto/create.product';
import { UpdateProductInput } from './dto/update.product';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { RestAuthAccessGuard } from 'src/common/auth/rest-auth-guards';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller('product')
@ApiTags('상품 API')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  //----------------- 생성 -----------------------//
  @UseGuards(RestAuthAccessGuard)
  @Post('/')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiOperation({
    summary: '상품 생성',
    description: '상품 생성 API',
  })
  @ApiBody({
    description:
      'form-data로 넘겨주세요. accessToken을 함께 넘겨줘야합니다. createProductInput에 상품 정보를 넣고, 이미지를 따로 넘겨주세요. postman예시는 카톡으로 드리겠습니다. ',
    type: CreateProductInput,
  })
  @ApiResponse({
    type: Product,
  })
  async createProduct(
    @Body('createproductRequest') createproductRequest: string,
    @Request() req,
    @UploadedFiles() files: Express.MulterS3.File,
  ) {
    const createProductInput = JSON.parse(createproductRequest);
    const userId = req.user.id;
    const product = await this.productsService.create({
      userId,
      createProductInput,
      files,
    });

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
    return product;
  }

  //----------------- 상품검색 -----------------------//
  @Get('/search/')
  @ApiOperation({
    summary: '상품 검색',
    description: '상품 검색 API',
  })
  @ApiResponse({
    description: '상품 리스트가 리턴됩니다',
    type: [Product],
  })
  async searchProducts(@Query('query') query: string) {
    return await this.productsService.search(query);
  }

  //----------------- 전체상품조회 -----------------------//
  // 하나의 api로 여러개의 옵션을 주는 방향이 나은가?
  @Get('/')
  @ApiOperation({
    summary: '상품 전체 조회',
    description: '상품 전체 조회 API',
  })
  @ApiResponse({
    description: '상품 리스트가 리턴됩니다',
    type: [Product],
  })
  async getProducts() {
    return await this.productsService.findAll();
  }

  //----------------- 상품상세조회 -----------------------//
  @Get('/:id')
  @ApiOperation({
    summary: '상품 상세 조회',
    description: '상품 상세 조회 API',
  })
  @ApiResponse({ type: Product })
  async getProduct(@Param('id') id: string) {
    return await this.productsService.find({ productId: id });
  }
  //-----------------카테고리별 상품조회 -----------------------//
  @Get('/category/:categoryId')
  @ApiOperation({
    summary: '카테고리별 상품 조회',
    description: '특정 카테고리의 상품을 조회합니다.',
  })
  @ApiResponse({ type: [Product] })
  async fetchProductsByCategory(
    @Param('categoryId') categoryId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const products = await this.productsService.fetchProductsByCategory(
      categoryId,
      (page = 1), //여기서 1페이지에 상품 몇개씩 넘길건지 정하는
      (limit = 12),
    );
    return products;
  }

  //----------------- 마이페이지 판매 중 경매 리스트 조회 -----------------------//
  @UseGuards(RestAuthAccessGuard)
  @ApiOperation({
    summary: '마이페이지 판매 중 경매 리스트',
    description: '마이페이지 판매 중 경매 리스트 조회 API',
  })
  @Get('/user/selling')
  findUserSellingAuction(@Req() req) {
    const userId = req.user.id;
    return this.productsService.findMySellingAuctionList({ userId });
  }

  //----------------- 마이페이지 판매 종료 경매 리스트 조회 -----------------------//
  @UseGuards(RestAuthAccessGuard)
  @ApiOperation({
    summary: '마이페이지 판매 종료 경매 리스트',
    description: '마이페이지 판매 종료 경매 리스트 조회 API',
  })
  @Get('/user/sold')
  findUserSoldAuction(@Req() req) {
    const userId = req.user.id;
    return this.productsService.findMySoldAuctionList({ userId });
  }
  //----------------- 상품 업데이트 -----------------------//
  // 상품 start_date 이후로 업데이트 못하게 하는 로직

  @Put('/:id')
  @ApiOperation({
    summary: '상품 업데이트',
    description: '상품 업데이트 API',
  })
  @ApiResponse({ type: Product })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductInput: UpdateProductInput,
  ) {
    return await this.productsService.update({
      productId: id,
      updateProductInput,
    });
  }

  //----------------- 삭제 -----------------------//
  @Delete('/:id')
  @ApiOperation({ summary: '상품 삭제', description: '상품 삭제 API' })
  @ApiResponse({ type: Boolean })
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.delete({ id });
  }

  // //----------------- 상품 판매중인 상태로 변경 -----------------------//
  // // 스케쥴러로 할것인가 인터벌로 할것인가...
  // @Put('/start/:id')
  // @ApiOperation({
  //   summary: '상품 상태 변경',
  //   description: '상품 상태 변경 API',
  // })
  // @ApiResponse({ type: UpdateProductInput })
  // async updateStart(@Param('id') id: string) {
  //   return await this.productsService.startStatus({ productId: id });
  // }

  // //----------------- 상품 판매완료 상태로 변경 -----------------------//
  // // 스케쥴러로 할것인가 인터벌로 할것인가...
  // @Put('/end/:id')
  // @ApiOperation({
  //   summary: '상품 상태 변경',
  //   description: '상품 상태 변경 API',
  // })
  // @ApiResponse({ type: UpdateProductInput })
  // async updateEnd(@Param('id') id: string) {
  //   return await this.productsService.endStatus({ productId: id });
  // }
}
