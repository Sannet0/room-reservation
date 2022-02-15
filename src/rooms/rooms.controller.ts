import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NonOccupiedRoomsResponseEntity } from './entity/non-occupied-rooms-response.entity';
import { NonOccupiedRoomsParamEntity } from './entity/non-occupied-rooms-param.entity';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomsService: RoomsService) { }

  @ApiOperation({ summary: 'Non occupied rooms' })
  @ApiParam({ name: 'param', type: NonOccupiedRoomsParamEntity })
  @ApiResponse({ status: 200, type: NonOccupiedRoomsResponseEntity, isArray: true })
  @Get('non-occupied-rooms')
  async nonOccupiedRooms(@Body() body: { checkin_date: string, checkout_date: string }): Promise<{ room_number: number }[] | HttpException> {
    return this.roomsService.nonOccupiedRooms(body);
  }
}
