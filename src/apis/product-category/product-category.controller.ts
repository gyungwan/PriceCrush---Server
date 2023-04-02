import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';

import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductCategory } from './entities/product-category.entity';

@Controller('product-category')
@ApiTags('상품 카테고리 API')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '상품 카테고리 생성',
    description: '상품 카테고리 생성 API',
  })
  @ApiCreatedResponse({
    description: '상품 카테고리 생성',
    type: ProductCategory,
  })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  })
  async createCategory(@Body() body): Promise<ProductCategory> {
    const name = body.name;
    if (name === undefined)
      throw new UnauthorizedException('카테고리 이름을 입력해주세요');
    return await this.productCategoryService.create({ name });
  }

  @Get()
  @ApiOperation({
    summary: '상품 카테고리 전체 조회',
    description: '상품 카테고리 전체 조회 API',
  })
  @ApiCreatedResponse({ description: '상품 카테고리', type: ProductCategory })
  getCategory() {
    return this.productCategoryService.findAll();
  }

  @Patch(':id')
  @ApiOperation({
    summary: '상품 카테고리 수정',
    description: '상품 카테고리 수정 API',
  })
  @ApiCreatedResponse({
    description: '상품 카테고리 수정',
    type: ProductCategory,
  })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
      },
    },
  })
  updateCategory(@Param('id') id: string, @Body() body) {
    const name = body.name;
    return this.productCategoryService.update({ id, name });
  }

  @Delete(':id')
  @ApiOperation({
    summary: '상품 카테고리 삭제',
    description: '상품 카테고리 삭제 API',
  })
  @ApiResponse({ status: 200, description: '삭제완료' })
  async removeCategory(@Param('id') id: string) {
    return this.productCategoryService.remove(id);
  }
}
