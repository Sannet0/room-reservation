import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const dbProvider = {
  provide: 'PG_CONNECTION',
  useValue:  new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'room_reservation',
    password: 'postgres',
    port: 5432
  }),
};


@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
