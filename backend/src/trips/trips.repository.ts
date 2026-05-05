import { Injectable } from '@nestjs/common';
import { Trip, TripStatus } from './entities/trip.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TripsRepository {
  private trips: Trip[] = [
    {
      tripId: 'seed-trip-1',
      travellerId: 'seed-traveller-1',
      planId: 'seed-plan-1',
      guideId: 'seed-guide-1',
      sourceCity: 'Delhi',
      destCity: 'Jaipur',
      servicePartners: ['seed-hotel-1'],
      locations: ['loc-delhi-1', 'loc-jaipur-1'],
      startDate: '2025-12-01',
      endDate: '2025-12-08',
      status: TripStatus.PLANNED,
      totalCost: 25000,
    },
  ];

  create(data: Omit<Trip, 'tripId'>): Trip {
    const trip: Trip = { tripId: uuidv4(), ...data };
    this.trips.push(trip);
    return trip;
  }

  findAll(): Trip[] {
    return this.trips;
  }

  findById(tripId: string): Trip | undefined {
    return this.trips.find((t) => t.tripId === tripId);
  }

  findByTraveller(travellerId: string): Trip[] {
    return this.trips.filter((t) => t.travellerId === travellerId);
  }

  findByGuide(guideId: string): Trip[] {
    return this.trips.filter((t) => t.guideId === guideId);
  }

  update(tripId: string, data: Partial<Trip>): Trip | undefined {
    const idx = this.trips.findIndex((t) => t.tripId === tripId);
    if (idx === -1) return undefined;
    this.trips[idx] = { ...this.trips[idx], ...data };
    return this.trips[idx];
  }

  delete(tripId: string): boolean {
    const idx = this.trips.findIndex((t) => t.tripId === tripId);
    if (idx === -1) return false;
    this.trips.splice(idx, 1);
    return true;
  }
}
