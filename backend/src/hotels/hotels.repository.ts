import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsRepository {
  private readonly hotels: Hotel[] = [
    {
      id: 'mumbai-grand-luxury',
      partnerId: 'partner-1',
      name: 'The Grand Luxury Resort',
      city: 'Mumbai',
      location: 'Marine Drive, Mumbai',
      description:
        'Experience luxury at its finest at The Grand Luxury Resort with views of the Arabian Sea.',
      stars: 5,
      rating: 0,
      reviewCount: 0,
      pricePerNight: 850,
      taxesAndFees: 120,
      image:
        'https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&q=80&w=800',
      amenities: ['Pool', 'Spa', 'Gym', 'Free WiFi', 'Restaurant'],
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: 'delhi-boutique',
      partnerId: 'partner-1',
      name: 'Delhi Heritage Boutique',
      city: 'Delhi',
      location: 'Connaught Place, Delhi',
      description: 'A charming heritage stay right in the heart of Delhi.',
      stars: 4,
      rating: 0,
      reviewCount: 0,
      pricePerNight: 450,
      taxesAndFees: 60,
      image:
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
      amenities: ['Free Breakfast', 'Free WiFi', 'Restaurant'],
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: 'goa-beachfront',
      partnerId: 'partner-2',
      name: 'Goa Beachfront Villa',
      city: 'Goa',
      location: 'Baga Beach, Goa',
      description:
        'Relax at our stunning beachfront property offering direct beach access.',
      stars: 5,
      rating: 0,
      reviewCount: 0,
      pricePerNight: 950,
      taxesAndFees: 150,
      image:
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
      amenities: ['Pool', 'Beach Access', 'Bar', 'Spa'],
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: 'bangalore-business',
      partnerId: 'partner-3',
      name: 'Tech Park Business Hotel',
      city: 'Bangalore',
      location: 'Whitefield, Bangalore',
      description:
        'Modern hotel catering to business travelers with excellent coworking spaces.',
      stars: 3,
      rating: 0,
      reviewCount: 0,
      pricePerNight: 200,
      taxesAndFees: 30,
      image:
        'https://images.unsplash.com/photo-1551882547-ff40c0d129df?auto=format&fit=crop&q=80&w=800',
      amenities: ['Coworking', 'Gym', 'Free WiFi'],
      status: 'active',
      createdAt: new Date(),
    },
  ];

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
