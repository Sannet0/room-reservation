import { IsString } from 'class-validator';

export class AverageRoomsLoadReportDto {

  @IsString()
  checkin_date: string;

  @IsString()
  checkout_date: string;
}
