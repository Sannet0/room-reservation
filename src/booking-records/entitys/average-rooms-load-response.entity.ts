import { ApiProperty } from '@nestjs/swagger';

export class AverageRoomsLoadResponseEntity {

  @ApiProperty({
    example: 'july     ',
    description: ''
  })
  record_month: string;

  @ApiProperty({
    example: 4,
    description: ''
  })
  room_number: number;

  @ApiProperty({
    example: '1',
    description: ''
  })
  average: string;
}
