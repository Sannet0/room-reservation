import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomsService: RoomsService) { }

  @Get('non-occupied-rooms')
  async nonOccupiedRooms(@Body() body: { checkin_date: string, checkout_date: string }): Promise<{ room_number: number }[] | HttpException> {
    return this.roomsService.nonOccupiedRooms(body);
  }

}
