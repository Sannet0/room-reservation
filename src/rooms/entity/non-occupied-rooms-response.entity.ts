import { ApiProperty } from '@nestjs/swagger';

export class NonOccupiedRoomsResponseEntity {

  @ApiProperty({
    example: 2,
    description: ''
  })
  room_number: number;
}
