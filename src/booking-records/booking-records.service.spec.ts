import { Test, TestingModule } from '@nestjs/testing';
import { BookingRecordsService } from './booking-records.service';

describe('BookingRecordsService', () => {
  let service: BookingRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingRecordsService],
    }).compile();

    service = module.get<BookingRecordsService>(BookingRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
