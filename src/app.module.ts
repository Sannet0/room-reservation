import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { BookingRecordsModule } from './booking-records/booking-records.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    RoomsModule,
    BookingRecordsModule,
    DatabaseModule
  ]
})
export class AppModule {}
