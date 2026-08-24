import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Booking, BookingStatus } from './entities/booking.entity';

type CreateBookingRecord = Omit<
  Booking,
  'id' | 'status' | 'createdAt' | 'hotel'
>;

@Injectable()
export class BookingsRepository {
  private readonly bookings: Booking[] = [];

  create(data: CreateBookingRecord): Booking {
    const booking: Booking = {
      id: randomUUID(),
      ...data,
      status: BookingStatus.CONFIRMED,
      createdAt: new Date(),
    };

    this.bookings.push(booking);
    return { ...booking };
  }

  findAll(): Booking[] {
    return this.bookings.map((booking) => ({ ...booking }));
  }

  cancel(id: string): Booking | undefined {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = BookingStatus.CANCELLED;
      return { ...booking };
    }
    return undefined;
  }

  findByHotelIds(hotelIds: string[]): Booking[] {
    const hotelIdSet = new Set(hotelIds);
    return this.bookings
      .filter((booking) => hotelIdSet.has(booking.hotelId))
      .map((booking) => ({ ...booking }));
  }
}
