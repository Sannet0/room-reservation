import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { BookingRecordsService } from './booking-records.service';

@Controller('booking-records')
export class BookingRecordsController {

  constructor(private readonly bookingRecordsService: BookingRecordsService) {
  }

  @Post('')
  async bookingRoom(@Body() body: { room_number: number, checkin_date: string, checkout_date: string }): Promise<[] | HttpException> {
    return this.bookingRecordsService.bookingRoom(body);
  }

  @Get('report/average-rooms-load')
  async averageRoomsLoadReport(@Body() body: { checkin_date: string, checkout_date: string }): Promise<{ record_month: string, room_number: number, average: string }[] | HttpException> {
    return this.bookingRecordsService.averageRoomsLoadReport(body);
  }

}
