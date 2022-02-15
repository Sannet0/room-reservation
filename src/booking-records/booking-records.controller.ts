import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingRecordsService } from './booking-records.service';
import { AverageRoomsLoadResponseEntity } from './entitys/average-rooms-load-response.entity';
import { AverageRoomsLoadParamEntity } from './entitys/avarage-room-load-param.entity';
import { BookingRoomParamEntity } from './entitys/booking-room-param.entity';
import { BookingRoomDto } from './dto/booking-room.dto';
import { AverageRoomsLoadReportDto } from './dto/average-rooms-load-report.dto';

@ApiTags('booking records')
@Controller('booking-records')
export class BookingRecordsController {

  constructor(private readonly bookingRecordsService: BookingRecordsService) {
  }

  @ApiOperation({ summary: 'Booking room' })
  @ApiParam({ name: 'param', type: BookingRoomParamEntity })
  @ApiResponse({ status: 200, description: 'room reserved successfully' })
  @ApiResponse({ status: 404, description: 'no such room' })
  @ApiResponse({ status: 502, description: '"check-in date cannot be greater or equal than check-out date " or "check-in and check-out date cannot be monday or thursday" or "room occupied"' })
  @Post('')
  async bookingRoom(@Body() body: BookingRoomDto): Promise<[] | HttpException> {
    return this.bookingRecordsService.bookingRoom(body);
  }

  @ApiOperation({ summary: 'Average rooms load report' })
  @ApiParam({ name: 'param', type: AverageRoomsLoadParamEntity })
  @ApiResponse({ status: 200, type: AverageRoomsLoadResponseEntity, isArray: true })
  @Get('report/average-rooms-load')
  async averageRoomsLoadReport(@Body() body: AverageRoomsLoadReportDto): Promise<{ record_month: string, room_number: number, average: string }[] | HttpException> {
    return this.bookingRecordsService.averageRoomsLoadReport(body);
  }

}
