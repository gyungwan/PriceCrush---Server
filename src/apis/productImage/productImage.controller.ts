import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductImageService } from './productImage.service';

@Controller('productImage')
@ApiTags('상품 이미지 API')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Get()
  @ApiOperation({})
  @ApiResponse({})
  async find(@Param() productID: string) {
    return await this.productImageService.find({ productID });
  }
}
