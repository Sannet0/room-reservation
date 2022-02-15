import { IsString } from 'class-validator';

export class GetNonOccupiedRoomsDto {

  @IsString()
  checkin_date: string;

  @IsString()
  checkout_date: string;
}
