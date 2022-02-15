import { IsNumber, IsString } from 'class-validator';

export class BookingRoomDto {

  @IsNumber()
  room_number: number;

  @IsString()
  checkin_date: string;

  @IsString()
  checkout_date: string;
}
