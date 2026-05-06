import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsRepository {
  private readonly hotels: Hotel[] = [];

  create(
    partnerId: string,
    data: Omit<Hotel, 'id' | 'partnerId' | 'createdAt'> & { id?: string },
  ): Hotel {
    const hotel: Hotel = {
      id: data.id || randomUUID(),
      partnerId,
      name: data.name,
      city: data.city,
      location: data.location,
      description: data.description,
      stars: data.stars,
      rating: data.rating,
      reviewCount: data.reviewCount,
      pricePerNight: data.pricePerNight,
      taxesAndFees: data.taxesAndFees,
      image: data.image,
      amenities: data.amenities,
      status: data.status,
      createdAt: new Date(),
    };

    this.hotels.push(hotel);
    return { ...hotel, amenities: [...hotel.amenities] };
  }

  findAll(filters?: { location?: string }): Hotel[] {
    const location = filters?.location?.trim().toLowerCase();
    return this.hotels
      .filter((hotel) => hotel.status === 'active')
      .filter((hotel) => {
        if (!location) return true;
        return (
          hotel.location.toLowerCase().includes(location) ||
          hotel.city.toLowerCase().includes(location)
        );
      })
      .map((hotel) => ({ ...hotel, amenities: [...hotel.amenities] }));
  }

  findById(id: string): Hotel | undefined {
    const hotel = this.hotels.find((item) => item.id === id);
    return hotel ? { ...hotel, amenities: [...hotel.amenities] } : undefined;
  }

  findByPartnerId(partnerId: string): Hotel[] {
    return this.hotels
      .filter((hotel) => hotel.partnerId === partnerId)
      .map((hotel) => ({ ...hotel, amenities: [...hotel.amenities] }));
  }

  update(id: string, data: Partial<Hotel>): Hotel | undefined {
    const index = this.hotels.findIndex((hotel) => hotel.id === id);
    if (index === -1) return undefined;

    this.hotels[index] = {
      ...this.hotels[index],
      ...data,
      amenities: data.amenities ?? this.hotels[index].amenities,
    };

    return {
      ...this.hotels[index],
      amenities: [...this.hotels[index].amenities],
    };
  }

  delete(id: string): boolean {
    const index = this.hotels.findIndex((hotel) => hotel.id === id);
    if (index === -1) return false;
    this.hotels.splice(index, 1);
    return true;
  }
}
