import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let service: RoomsService;
  let database = {
    query: (query: string) => {
      const replacedQuery = query.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', ');
      if(replacedQuery === 'SELECTrroomnumberFROMroomsJOINSELECTFROMbookingrecordsASbrWHEREbrcheckoutdateANDbrcheckindateASbronbrroomnumberroomsroomnumberRIGHTOUTERJOINroomsASrONrroomnumberroomsroomnumberWHEREroomsroomnumberisNULL') {
        return {
          rows: [
            {
              "room_number": 19
            },
            {
              "room_number": 20
            }
          ]
        }
      }
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'PG_CONNECTION',
          useValue: database
        },
        RoomsService
      ]
    })
      .compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('nonOccupiedRooms', () => {
    it('should return an array of non occupied rooms', async () => {
      const result =  await service.nonOccupiedRooms({
        checkin_date: "2022-04-03",
        checkout_date: "2022-05-01"
      });

      expect(result).toEqual([
        {
          "room_number": 19
        },
        {
          "room_number": 20
        }
      ]);
    })
  });

});
