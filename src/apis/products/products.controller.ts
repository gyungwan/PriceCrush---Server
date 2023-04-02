import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductInput } from './dto/create.product';
import { UpdateProductInput } from './dto/update.product';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('product')
@ApiTags('상품 API')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //----------------- 생성 -----------------------//
  @Post('/')
  @ApiOperation({
    summary: '상품 생성',
    description: '상품 생성 API',
  })
  @ApiResponse({
    type: Product,
  })
  async createProduct(@Body() createProductInput: CreateProductInput) {
    return await this.productsService.create({ createProductInput });
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
}
