import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';

@Controller('auction')
@ApiTags('경매 API')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  // 새로운 옥션은 bid가 시작될때 소켓을 통해 만들어지기 떄문에 아래 코드는 불필요
  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionService.create(createAuctionDto);
  }

  @Get()
  findAll() {
    return '';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return '';
  }

  @Patch(':id')
  @ApiOperation({ summary: '경매 종료', description: '경매 종료 API' })
  @ApiResponse({ type: Object })
  async auctionEnd(@Param('auctionID') auctionId: string) {
    return await this.auctionService.auctionEnd(auctionId);
  }

  @Delete(':id')
  @ApiOperation({ summary: '경매 삭제', description: '경매 삭제 API' })
  @ApiResponse({ type: Boolean })
  async auctionDelete(@Param('auctionID') auctionId: string) {
    return await this.auctionService.auctionDelete(auctionId);
  }
}
