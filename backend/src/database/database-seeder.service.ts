import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth, Role } from '../auth/entities/auth.entity';
import { Hotel } from '../hotels/entities/hotel.entity';
import {
  Experience,
  ExperienceAvailability,
  ExperienceCategory,
} from '../experiences/entities/experience.entity';
import { Plan } from '../plans/entities/plan.entity';
import { Trip, TripStatus, TripType } from '../trips/entities/trip.entity';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Auth)
    private readonly usersRepository: Repository<Auth>,
    @InjectRepository(Hotel)
    private readonly hotelsRepository: Repository<Hotel>,
    @InjectRepository(Experience)
    private readonly experiencesRepository: Repository<Experience>,
    @InjectRepository(Plan)
    private readonly plansRepository: Repository<Plan>,
    @InjectRepository(Trip)
    private readonly tripsRepository: Repository<Trip>,
  ) {}

  async onModuleInit() {
    await this.seedUsers();
    await this.seedHotels();
    await this.seedExperiences();
    await this.seedPlans();
    await this.seedTrips();
  }

  private async seedUsers() {
    if (await this.usersRepository.count()) return;

    await this.usersRepository.save([
      {
        userId: '00001',
        username: 'rahul_v',
        password: 'rahul@123',
        role: Role.SUPERADMIN,
        name: 'Rahul Varma',
        email: 'rahul@xploreo.com',
        phone: '9876543210',
        status: 'active',
      },
      {
        userId: '10001',
        username: 'sreekar_k',
        password: 'sreekar',
        role: Role.GUIDE,
        name: 'Sreekar',
        email: 'sreekar@gmail.com',
        phone: '9876543210',
        status: 'active',
      },
      {
        userId: '20001',
        username: 'anjali_s',
        password: 'anjali@123',
        role: Role.TRAVELLER,
        name: 'Anjali Sharma',
        email: 'anjali@xploreo.com',
        phone: '9123456780',
        status: 'active',
      },
      {
        userId: '00201',
        username: 'sneha_p',
        password: 'sneha@123',
        role: Role.TECHADMIN,
        name: 'Sneha Patel',
        email: 'sneha@xploreo.com',
        phone: '8899776655',
        status: 'active',
      },
      {
        userId: '00301',
        username: 'arjun_m',
        password: 'arjun@123',
        role: Role.NONTECHADMIN,
        name: 'Arjun Mehta',
        email: 'arjun@xploreo.com',
        phone: '7788996655',
        status: 'active',
      },
      {
        userId: '30001',
        username: 'rohit_d',
        password: 'rohit@123',
        role: Role.EXPERIENCE,
        name: 'Rohit Das',
        email: 'rohit@xploreo.com',
        phone: '7766554433',
        status: 'active',
      },
      {
        userId: '201',
        username: 'acr',
        password: 'acr@12345',
        role: Role.HOTEL,
        name: 'ARC Hotels',
        email: 'acrh@xploreo.com',
        phone: '7766513370',
        status: 'active',
      },
    ]);
  }

  private async seedHotels() {
    if (await this.hotelsRepository.count()) return;

    await this.hotelsRepository.save([
      {
        id: 'hotel-goa-grand',
        name: 'The Grand Xploreo Goa',
        city: 'Goa',
        location: 'Calangute Beach, Goa',
        description: 'Luxury beachfront stay with curated experiences and airport transfers.',
        stars: 5,
        rating: 4.8,
        reviewCount: 312,
        pricePerNight: 285,
        taxesAndFees: 42,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        amenities: ['Pool', 'Breakfast Included', 'Airport Transfer'],
        status: 'active',
      },
      {
        id: 'hotel-bali-bay',
        name: 'Bali Bay Resort',
        city: 'Bali',
        location: 'Seminyak, Bali',
        description: 'Resort stay with private beach access and family-friendly rooms.',
        stars: 4,
        rating: 4.5,
        reviewCount: 218,
        pricePerNight: 210,
        taxesAndFees: 28,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
        amenities: ['Beach Access', 'Spa', 'Family Rooms'],
        status: 'active',
      },
      {
        id: 'hotel-kyoto-zen',
        name: 'Zen Kyoto Suites',
        city: 'Kyoto',
        location: 'Gion District, Kyoto',
        description: 'Boutique city stay near temple trails and tea ceremony venues.',
        stars: 5,
        rating: 4.9,
        reviewCount: 146,
        pricePerNight: 390,
        taxesAndFees: 51,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        amenities: ['Breakfast Included', 'City Views', 'Concierge'],
        status: 'active',
      },
    ]);
  }

  private async seedExperiences() {
    if (await this.experiencesRepository.count()) return;

    await this.experiencesRepository.save([
      {
        id: 'exp-sunset-beach-walk',
        title: 'Sunset Beach Photography Walk',
        description: 'Golden-hour guided walk for photographers and first-time visitors.',
        destination: 'Goa',
        category: ExperienceCategory.PHOTOGRAPHY,
        availability: ExperienceAvailability.AVAILABLE,
        price: 75,
        durationHours: 2,
        capacity: 12,
        booked: 8,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        nextSlot: '10:00 AM',
        slots: [
          { id: 'goa-photo-1', date: '2026-05-20', time: '10:00 AM', booked: 8, capacity: 12, available: true },
          { id: 'goa-photo-2', date: '2026-05-20', time: '2:00 PM', booked: 11, capacity: 12, available: true },
        ],
      },
      {
        id: 'exp-food-tour-paris',
        title: 'Historic Downtown Food Tour',
        description: 'Tasting-led cultural walk across classic neighborhood favorites.',
        destination: 'Paris',
        category: ExperienceCategory.CULINARY,
        availability: ExperienceAvailability.AVAILABLE,
        price: 80,
        durationHours: 3,
        capacity: 12,
        booked: 11,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
        nextSlot: '2:00 PM',
        slots: [
          { id: 'paris-food-1', date: '2026-05-21', time: '10:00 AM', booked: 6, capacity: 12, available: true },
          { id: 'paris-food-2', date: '2026-05-21', time: '2:00 PM', booked: 11, capacity: 12, available: true },
        ],
      },
    ]);
  }

  private async seedPlans() {
    if (await this.plansRepository.count()) return;

    await this.plansRepository.save([
      {
        id: 'plan-kyoto-cultural-escape',
        title: 'Kyoto Cultural Escape',
        description: 'Temple trails, tea ceremony, and a relaxed final evening in Gion.',
        originCity: 'Hyderabad',
        destination: 'Kyoto, Japan',
        durationNights: 5,
        pricePerPerson: 251000,
        hotelStars: 5,
        includesFlight: true,
        image: 'https://images.unsplash.com/photo-1528164344705-47542687000d',
        tags: ['Culture', 'Luxury', 'Guided'],
        itinerary: [
          { day: 'Day 1', title: 'Arrival', detail: 'Check-in and unwind in Gion.' },
          { day: 'Day 2', title: 'Fushimi Inari', detail: 'Morning shrine visit and food trail.' },
        ],
      },
      {
        id: 'plan-santorini-sunset-retreat',
        title: 'Santorini Sunset Retreat',
        description: 'Aegean views, winery tasting, and a relaxed island itinerary.',
        originCity: 'Hyderabad',
        destination: 'Santorini, Greece',
        durationNights: 7,
        pricePerPerson: 172500,
        hotelStars: 5,
        includesFlight: true,
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
        tags: ['Luxury', 'Relaxed', 'Island'],
        itinerary: [
          { day: 'Day 1', title: 'Arrival', detail: 'Check-in at Caldera Horizon Suites.' },
          { day: 'Day 2', title: 'Oia Sunset', detail: 'Sunset cruise and old-town walk.' },
        ],
      },
    ]);
  }

  private async seedTrips() {
    if (await this.tripsRepository.count()) return;

    const trips: Trip[] = [
      {
        id: '48291',
        travellerId: '20001',
        guideId: '10001',
        planId: 'plan-kyoto-cultural-escape',
        title: 'Kyoto Cultural Escape',
        destination: 'Kyoto, Japan',
        location: 'Kyoto, Japan',
        startDate: '2026-10-12',
        endDate: '2026-10-17',
        status: TripStatus.ONGOING,
        amount: 502000,
        guests: 2,
        durationLabel: '5 days',
        type: TripType.PACKAGE,
        itinerary: [
          { day: 'Day 1', title: 'Arrival', detail: 'Check-in at Ritz-Carlton Kyoto.' },
          { day: 'Day 2', title: 'Fushimi Inari', detail: 'Morning shrine visit.' },
        ],
        currentLocation: 'Tea ceremony in Gion',
        paymentBreakdown: { flights: 142000, stay: 210000, activities: 98000, guide: 52000 },
        documents: [{ id: 'doc-flight', title: 'Flight Ticket', status: 'Ready' }],
      },
      {
        id: '39210',
        travellerId: '20001',
        guideId: '10001',
        planId: 'plan-santorini-sunset-retreat',
        title: 'Santorini Sunset Retreat',
        destination: 'Santorini, Greece',
        location: 'Santorini, Greece',
        startDate: '2026-07-04',
        endDate: '2026-07-11',
        status: TripStatus.UPCOMING,
        amount: 345000,
        guests: 2,
        durationLabel: '7 days',
        type: TripType.PACKAGE,
        itinerary: [
          { day: 'Day 1', title: 'Arrival', detail: 'Check-in at Caldera Horizon Suites.' },
        ],
        currentLocation: '',
        paymentBreakdown: { flights: 110000, stay: 145000, activities: 56000, guide: 34000 },
        documents: [{ id: 'doc-hotel-2', title: 'Hotel Voucher', status: 'Ready' }],
      },
      {
        id: 'trip-guide-versailles',
        travellerId: '20002',
        guideId: '10001',
        planId: 'plan-guide-versailles',
        title: 'Versailles Palace Tour',
        destination: 'Versailles, France',
        location: 'Versailles, France',
        startDate: '2026-03-30',
        endDate: '2026-03-30',
        status: TripStatus.UPCOMING,
        amount: 360,
        guests: 3,
        durationLabel: '4 hours',
        type: TripType.EXPERIENCE,
        itinerary: [
          { day: 'Day 1', title: 'Palace Tour', detail: 'Main Gates to Hall of Mirrors.' },
        ],
        currentLocation: '',
        paymentBreakdown: { flights: 0, stay: 0, activities: 360, guide: 0 },
        documents: [{ id: 'doc-exp-1', title: 'Experience Voucher', status: 'Ready' }],
      },
    ];

    await this.tripsRepository.save(trips);
  }
}
