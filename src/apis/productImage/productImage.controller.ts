import { Controller, Post, Req, Res } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('productImage')
@ApiTags('상품 이미지 업로드 API')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: '상품 이미지 업로드',
    description: '상품 이미지 업로드 API',
  })
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        upload: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async create(@Req() request, @Res() response) {}
}
