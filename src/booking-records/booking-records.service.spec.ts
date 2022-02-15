import { Test, TestingModule } from '@nestjs/testing';
import { BookingRecordsService } from './booking-records.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('BookingRecordsService', () => {
  let service: BookingRecordsService;
  let database = {
    query: (query: string) => {
      const replacedQuery = query.replace(/[^a-z0-9]/gi,'').replace(/\s+/gi,', ');
      if(replacedQuery === 'SELECTFROMroomsWHEREroomnumber19') {
        return {
          rows: [
            {
              room_number: 19,
              price: 1000
            }
          ]
        }
      }
      if(replacedQuery === 'SELECTFROMroomsWHEREroomnumber1') {
        return {
          rows: []
        }
      }
      if(replacedQuery === 'SELECTbookingrecordsroomnumberFROMbookingrecordsWHERE202243bookingrecordscheckoutdateAND202251bookingrecordscheckindateANDroomnumber19LIMIT1') {
        return {
          rows: []
        }
      }
      if(replacedQuery === 'SELECTbookingrecordsroomnumberFROMbookingrecordsWHERE202292bookingrecordscheckoutdateAND202299bookingrecordscheckindateANDroomnumber19LIMIT1') {
        return {
          rows: [
            {
              room_number: 19,
              checkin_date: "2022-09-02",
              checkout_date: "2022-09-09"
            }
          ]
        }
      }
      if(replacedQuery === 'INSERTINTObookingrecordsroomnumbercheckindatecheckoutdateVALUES19202243202251') {
        return {
          rows: []
        }
      }
      if(replacedQuery === 'SELECTtocharbookingrecordscheckindatemonthASrecordmonthbookingrecordsroomnumberroundavgabsextractdayfrombookingrecordscheckindatetimestampbookingrecordscheckoutdatetimestampASaverageFROMbookingrecordsWHERE202243bookingrecordscheckoutdateAND202251bookingrecordscheckindateGROUPBYrecordmonthbookingrecordsroomnumberORDERBYrecordmonthbookingrecordsroomnumber') {
        return {
          rows: [
            {
              record_month: "april    ",
              room_number: 2,
              average: "6"
            },
            {
              record_month: "april    ",
              room_number: 3,
              average: "6"
            }
          ]
        }
      }
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'PG_CONNECTION',
          useValue: database
        },
        BookingRecordsService
      ],
    }).compile();

    service = module.get<BookingRecordsService>(BookingRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('bookingRoom', () => {
    it('should return an http exception with status code 201', async () => {
      const result =  await service.bookingRoom({
        room_number: 19,
        checkin_date: "2022-04-03",
        checkout_date: "2022-05-01"
      });

      expect(result).toEqual(new HttpException('room reserved successfully', HttpStatus.CREATED));
    })
    it('should return an http exception with status code 502 and message "check-in date cannot be greater or equal than check-out date"', async () => {
      const result =  await service.bookingRoom({
        room_number: 19,
        checkin_date: "2022-05-01",
        checkout_date: "2022-04-03"
      });

      expect(result).toEqual(new HttpException('check-in date cannot be greater or equal than check-out date', HttpStatus.BAD_REQUEST));
    })
    it('should return an http exception with status code 502 and message "check-in and check-out date cannot be monday or thursday"', async () => {
      const result =  await service.bookingRoom({
        room_number: 19,
        checkin_date: "2022-02-15",
        checkout_date: "2022-02-17"
      });

      expect(result).toEqual(new HttpException('check-in and check-out date cannot be monday or thursday', HttpStatus.BAD_REQUEST));
    })
    it('should return an http exception with status code 404 and message "no such room"', async () => {
      const result =  await service.bookingRoom({
        room_number: 1,
        checkin_date: "2022-04-03",
        checkout_date: "2022-05-01"
      });

      expect(result).toEqual(new HttpException('no such room', HttpStatus.NOT_FOUND));
    })
    it('should return an http exception with status code 404 and message "room occupied"', async () => {
      const result =  await service.bookingRoom({
        room_number: 19,
        checkin_date: "2022-09-02",
        checkout_date: "2022-09-09"
      });

      expect(result).toEqual(new HttpException('room occupied', HttpStatus.BAD_REQUEST));
    })
  });

  describe('averageRoomsLoadReport', () => {
    it('should return an array of average rooms load group by month', async () => {
      const result =  await service.averageRoomsLoadReport({
        checkin_date: "2022-04-03",
        checkout_date: "2022-05-01"
      });

      expect(result).toEqual([
        {
          record_month: "april    ",
          room_number: 2,
          average: "6"
        },
        {
          record_month: "april    ",
          room_number: 3,
          average: "6"
        }
      ]);
    })
  });
});
