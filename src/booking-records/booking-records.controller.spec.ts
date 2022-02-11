import { Test, TestingModule } from '@nestjs/testing';
import { BookingRecordsController } from './booking-records.controller';

describe('BookingRecordsController', () => {
  let controller: BookingRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingRecordsController],
    }).compile();

    controller = module.get<BookingRecordsController>(BookingRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
