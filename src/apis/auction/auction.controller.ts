import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { RestAuthAccessGuard } from 'src/common/auth/rest-auth-guards';

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

  @UseGuards(RestAuthAccessGuard)
  @ApiOperation({
    summary: '마이페이지 입찰 중 경매 리스트',
    description: '마이페이지 입찰 중 경매 리스트 조회 API',
  })
  @Get('/user/bidding')
  findBidAuction(@Req() req) {
    const userId = req.user.id;
    return this.auctionService.findBiddingList({ userId });
  }

  @UseGuards(RestAuthAccessGuard)
  @ApiOperation({
    summary: '마이페이지 종료된 입찰 경매 리스트',
    description: '마이페이지 종료된 입찰 경매 리스트 조회 API',
  })
  @Get('/user/endedBid')
  findEndedBidAuction(@Req() req) {
    const userId = req.user.id;
    return this.auctionService.findEndedBidList({ userId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return '';
  }

  @Patch('/')
  @ApiOperation({ summary: '경매 종료', description: '경매 종료 API' })
  @ApiResponse({ type: Object })
  async auctionEnd(
    //
    @Body('id') productId: string,
  ) {
    console.log('종료', productId);
    return await this.auctionService.auctionEnd(productId);
  }

  @Delete('/')
  @ApiOperation({ summary: '경매 삭제', description: '경매 삭제 API' })
  @ApiResponse({ type: Boolean })
  async auctionDelete(@Query('id') productId: string) {
    //console.log('종료', auctionId);
    return await this.auctionService.auctionDelete(productId);
  }
}
