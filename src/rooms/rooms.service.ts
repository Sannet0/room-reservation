import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
  constructor(@Inject('PG_CONNECTION') private db: any) {}

  async nonOccupiedRooms(row: { checkin_date: string, checkout_date: string }): Promise<{ room_number: number }[] | HttpException> {
    try {
      const checkin_date = new Date(row.checkin_date);
      const checkout_date = new Date(row.checkout_date);

      row.checkin_date = `${ checkin_date.getFullYear() }-${ checkin_date.getMonth() + 1 }-${ checkin_date.getDate() }`;
      row.checkout_date = `${ checkout_date.getFullYear() }-${ checkout_date.getMonth() + 1 }-${ checkout_date.getDate() }`;

      const result = await this.db.query(`
        SELECT r.room_number FROM rooms	
        JOIN(
          SELECT * FROM booking_records AS br 
          WHERE ('${ row.checkin_date }' < br.checkout_date)
          AND ('${ row.checkout_date }' > br.checkin_date)) AS br on br.room_number = rooms.room_number
        RIGHT OUTER JOIN rooms AS r ON r.room_number = rooms.room_number 
        WHERE rooms.room_number is NULL
      `);

      return result.rows;
    } catch (err) {
      return new HttpException(err.detail || err.response || 'something wrong', err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
