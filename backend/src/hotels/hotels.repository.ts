import { Injectable } from '@nestjs/common';
import { Hotel } from './entities/hotel.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HotelsRepository {
  private hotels: Hotel[] = [
    {
      id: 'hotel-1',
      name: 'The Grand Maratha',
      city: 'Mumbai',
      location: 'loc-mumbai-1',
      description: 'A luxurious 5-star hotel overlooking the Arabian Sea.',
      stars: 5,
      rating: 4.8,
      reviewCount: 312,
      pricePerNight: 8500,
      taxesAndFees: 1200,
      image: '',
      amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi'],
      status: 'active',
    },
    {
      id: 'hotel-2',
      name: 'Coorg Forest Retreat',
      city: 'Coorg',
      location: 'loc-coorg-1',
      description: 'Eco-friendly resort nestled in the heart of coffee plantations.',
      stars: 4,
      rating: 4.5,
      reviewCount: 178,
      pricePerNight: 4200,
      taxesAndFees: 650,
      image: '',
      amenities: ['Nature Walks', 'Pool', 'Restaurant', 'WiFi'],
      status: 'active',
    },
  ];

  create(data: Partial<Hotel>): Hotel {
    const hotel: Hotel = {
      id: data.id || uuidv4(),
      name: data.name!,
      city: data.city!,
      location: data.location!,
      description: data.description!,
      stars: data.stars!,
      rating: data.rating ?? 0,
      reviewCount: data.reviewCount ?? 0,
      pricePerNight: data.pricePerNight!,
      taxesAndFees: data.taxesAndFees ?? 0,
      image: data.image ?? '',
      amenities: data.amenities ?? [],
      status: data.status ?? 'active',
    };
    this.hotels.push(hotel);
    return hotel;
  }

  findAll(): Hotel[] {
    return [...this.hotels].sort((a, b) =>
      a.city.localeCompare(b.city) || a.name.localeCompare(b.name),
    );
  }

  findById(id: string): Hotel | undefined {
    return this.hotels.find((h) => h.id === id);
  }

  findByLocation(locationId: string): Hotel[] {
    const q = locationId.toLowerCase();
    return this.hotels.filter(
      (h) =>
        h.city.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q),
    );
  }

  update(id: string, data: Partial<Hotel>): Hotel | undefined {
    const idx = this.hotels.findIndex((h) => h.id === id);
    if (idx === -1) return undefined;
    this.hotels[idx] = { ...this.hotels[idx], ...data };
    return this.hotels[idx];
  }

  delete(id: string): boolean {
    const idx = this.hotels.findIndex((h) => h.id === id);
    if (idx === -1) return false;
    this.hotels.splice(idx, 1);
    return true;
  }
}
