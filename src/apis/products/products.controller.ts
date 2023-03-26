import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductInput } from './dto/create.product';
import { ProductsService } from './products.service';

@Controller('Product')
@ApiTags('상품 API')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //----------------- 생성 -----------------------//
  // @Post('/')
  // @ApiOperation({ summary: '상품 생성', description: '상품 생성 API' })
  // async createProduct(@Body() createProductInput: CreateProductInput) {
  //   return await this.productsService.create({ createProductInput });
  // }
}
