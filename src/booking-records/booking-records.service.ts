import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BookingRecordsService {
  constructor(@Inject('PG_CONNECTION') private db: any) {}

  async bookingRoom(row: { room_number: number, checkin_date: string, checkout_date: string }): Promise<[] | HttpException> {
    try {
      const checkin_date = new Date(row.checkin_date);
      const checkout_date = new Date(row.checkout_date);

      if(checkin_date >= checkout_date) {
        return new HttpException('check-in date cannot be greater or equal than check-out date', HttpStatus.BAD_REQUEST);
      }

      if(checkin_date.getDay() === 1 || checkin_date.getDay() === 4 || checkout_date.getDay() === 1 || checkout_date.getDay() === 4) {
        return new HttpException('check-in and check-out date cannot be monday or thursday', HttpStatus.BAD_REQUEST);
      }

      row.checkin_date = `${ checkin_date.getFullYear() }-${ checkin_date.getMonth() + 1 }-${ checkin_date.getDate() }`;
      row.checkout_date = `${ checkout_date.getFullYear() }-${ checkout_date.getMonth() + 1 }-${ checkout_date.getDate() }`;

      const rooms = await this.db.query(`
        SELECT * FROM rooms WHERE room_number = '${ row.room_number }'
      `);

      if(rooms.rows.length === 0) {
        return new HttpException('no such room', HttpStatus.NOT_FOUND);
      }

      const occupiedRooms = await this.db.query(`
        SELECT booking_records.room_number FROM booking_records 
        WHERE ('${ row.checkin_date }' < booking_records.checkout_date)
        AND ('${ row.checkout_date }' > booking_records.checkin_date)
        AND room_number = '${ row.room_number }'
        LIMIT 1
      `);

      if(occupiedRooms.rows.length !== 0) {
        return new HttpException('room occupied', HttpStatus.BAD_REQUEST);
      }

      await this.db.query(`
        INSERT INTO booking_records ("room_number", "checkin_date", "checkout_date") 
        VALUES ('${ row.room_number }', 
        '${ row.checkin_date }', 
        '${ row.checkout_date }')`
      );

      return new HttpException('room reserved successfully', HttpStatus.CREATED);
    } catch (err) {
      return new HttpException(err.detail || err.response || 'something wrong', err.status || HttpStatus.BAD_REQUEST);
    }
  }

  async averageRoomsLoadReport(row: { checkin_date: string, checkout_date: string }): Promise<{ record_month: string, room_number: number, average: string }[] | HttpException> {
    try {
      const checkin_date = new Date(row.checkin_date);
      const checkout_date = new Date(row.checkout_date);

      row.checkin_date = `${ checkin_date.getFullYear() }-${ checkin_date.getMonth() + 1 }-${ checkin_date.getDate() }`;
      row.checkout_date = `${ checkout_date.getFullYear() }-${ checkout_date.getMonth() + 1 }-${ checkout_date.getDate() }`;

      const result = await this.db.query(
        `SELECT
        to_char(booking_records.checkin_date, 'month') AS record_month,
        booking_records.room_number, 
        round(avg(abs(extract(day from booking_records.checkin_date::timestamp - booking_records.checkout_date::timestamp)))) AS average
        FROM booking_records
        WHERE ('${ row.checkin_date }' < booking_records.checkout_date)
        AND ('${ row.checkout_date }' > booking_records.checkin_date)
        GROUP BY record_month, booking_records.room_number
        ORDER BY record_month, booking_records.room_number`
      );

      return result.rows
    } catch (err) {
      return new HttpException(err.detail || err.response || 'something wrong', err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
