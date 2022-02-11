import { Module } from '@nestjs/common';
import { BookingRecordsController } from './booking-records.controller';
import { BookingRecordsService } from './booking-records.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BookingRecordsController],
  providers: [BookingRecordsService]
})
export class BookingRecordsModule {}
