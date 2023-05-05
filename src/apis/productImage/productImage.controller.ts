import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductImageService } from './productImage.service';
import { ProductImage } from './entities/productImage.entity';

@Controller('productImage')
@ApiTags('상품 상세 조회 API')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Get()
  @ApiOperation({
    summary: '상품 상세 조회',
    description: '상품 상세 조회 API',
  })
  @ApiResponse({
    description: 'productImage 와 product 정보 리턴',
  })
  async find(@Query('productId') productID: string) {
    return await this.productImageService.find({ productID });
  }
}
