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
} from '@nestjs/common';
import {
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

@Controller('product')
@ApiTags('상품 API')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //----------------- 생성 -----------------------//
  //@UseGuards(RestAuthAccessGuard)
  @Post('/')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiOperation({
    summary: '상품 생성',
    description: '상품 생성 API',
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
    return await this.productsService.create({ userId, createProductInput, files });
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
