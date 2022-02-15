import { ApiProperty } from '@nestjs/swagger';

export class BookingRoomParamEntity {

  @ApiProperty({
    example: 2
  })
  room_number: number;

  @ApiProperty({
    example: '2022-07-03'
  })
  checkin_date: string;

  @ApiProperty({
    example: '2022-07-10'
  })
  checkout_date: string;
}
