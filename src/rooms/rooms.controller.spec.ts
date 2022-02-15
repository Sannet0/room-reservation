import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

describe('RoomsController', () => {
  let controller: RoomsController;
  let service = {
    nonOccupiedRooms: (body: { checkin_date: string, checkout_date: string }) => {
      return [
        {
          "room_number": 19
        },
        {
          "room_number": 20
        }
      ]
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService]
    })
      .overrideProvider(RoomsService)
      .useValue(service)
      .compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('nonOccupiedRooms', () => {
    it('should return an array of non occupied rooms', async () => {
      const result =  await controller.nonOccupiedRooms({
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
