import { ApiProperty } from '@nestjs/swagger';

export class NonOccupiedRoomsParamEntity {

  @ApiProperty({
    example: '2022-07-03',
    description: ''
  })
  checkin_date: string;

  @ApiProperty({
    example: '2022-07-10',
    description: ''
  })
  checkout_date: string;
}
