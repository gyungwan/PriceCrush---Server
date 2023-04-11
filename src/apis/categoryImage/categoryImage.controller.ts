import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryImageService } from './categoryImage.service';

@Controller('categoryImage')
@ApiTags('카테고리 이미지 API')
export class CategoryImageController {
  constructor(private readonly categoryImageService: CategoryImageService) {}

  @Get()
  @ApiOperation({})
  @ApiResponse({})
  async find(@Param() categoryID: string) {
    return await this.categoryImageService.find({ categoryID });
  }
}
