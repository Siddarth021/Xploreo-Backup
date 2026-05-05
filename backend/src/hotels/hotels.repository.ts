import { Injectable } from '@nestjs/common';
import { Hotel } from './entities/hotel.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HotelsRepository {
  private hotels: Hotel[] = [
    {
      hotelId: 'seed-hotel-1',
      hotel_name: 'The Grand Xploreo',
      location: 'loc-goa-beach-1',
      description: 'Luxury beachfront hotel with full amenities',
      contact_number: 8321456789,
      email: 'hotel@grandxploreo.com',
      tax_id: 'TAX-GJ-12345',
      bank_account_number: '****1234',
      check_in_time: '14:00',
      check_out_time: '11:00',
      cancellation_policy: 'Free cancellation within 24 hours',
    },
  ];

  create(data: Omit<Hotel, 'hotelId'>): Hotel {
    const hotel: Hotel = { hotelId: uuidv4(), ...data };
    this.hotels.push(hotel);
    return hotel;
  }

  findAll(): Hotel[] {
    return this.hotels;
  }

  findById(hotelId: string): Hotel | undefined {
    return this.hotels.find((h) => h.hotelId === hotelId);
  }

  findByLocation(locationId: string): Hotel[] {
    return this.hotels.filter((h) => h.location === locationId);
  }

  update(hotelId: string, data: Partial<Hotel>): Hotel | undefined {
    const idx = this.hotels.findIndex((h) => h.hotelId === hotelId);
    if (idx === -1) return undefined;
    this.hotels[idx] = { ...this.hotels[idx], ...data };
    return this.hotels[idx];
  }

  delete(hotelId: string): boolean {
    const idx = this.hotels.findIndex((h) => h.hotelId === hotelId);
    if (idx === -1) return false;
    this.hotels.splice(idx, 1);
    return true;
  }
}
