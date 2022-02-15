import { Test, TestingModule } from '@nestjs/testing';
import { BookingRecordsController } from './booking-records.controller';
import { BookingRecordsService } from './booking-records.service';
import { DatabaseModule } from '../database/database.module';

describe('BookingRecordsController', () => {
  let controller: BookingRecordsController;
  let service = {
    bookingRoom: (body: { room_number: number, checkin_date: string, checkout_date: string }) => {
      return {
        response: "room reserved successfully",
        status: 201,
        message: "room reserved successfully",
        name: "HttpException"
      }
    },
    averageRoomsLoadReport: (body: { checkin_date: string, checkout_date: string }) => {
      return [
        {
          "record_month": "april    ",
          "room_number": 2,
          "average": "6"
        },
        {
          "record_month": "april    ",
          "room_number": 3,
          "average": "6"
        }
      ]
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [BookingRecordsController],
      providers: [BookingRecordsService]
    })
      .overrideProvider(BookingRecordsService)
      .useValue(service)
      .compile();

    controller = module.get<BookingRecordsController>(BookingRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('bookingRoom', () => {
    it('should return an http exception with status code 201', async () => {
      const result =  await controller.bookingRoom({
        room_number: 19,
        checkin_date: "2022-04-03",
        checkout_date: "2022-05-01"
      });

      expect(result).toEqual({
        response: "room reserved successfully",
        status: 201,
        message: "room reserved successfully",
        name: "HttpException"
      });
    })
  });

  describe('averageRoomsLoadReport', () => {
    it('should return an array of average rooms load group by month', async () => {
      const result =  await controller.averageRoomsLoadReport({
        checkin_date: "2022-04-03",
        checkout_date: "2022-05-01"
      });

      expect(result).toEqual([
        {
          "record_month": "april    ",
          "room_number": 2,
          "average": "6"
        },
        {
          "record_month": "april    ",
          "room_number": 3,
          "average": "6"
        }
      ]);
    })
  });
});
