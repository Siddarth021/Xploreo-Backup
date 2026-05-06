import { Hotel } from '../../hotels/entities/hotel.entity';

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export class Booking {
  id!: string;
  hotelId!: string;
  travellerId!: string;
  guestName!: string;
  email!: string;
  phone!: string;
  checkIn!: string;
  checkOut!: string;
  guests!: number;
  roomType!: string;
  notes?: string;
  totalAmount!: number;
  status!: BookingStatus;
  createdAt!: Date;
  hotel?: Hotel;
}
