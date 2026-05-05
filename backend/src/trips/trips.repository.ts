import { Injectable } from '@nestjs/common';
import { Trip, TripStatus, TripType } from './entities/trip.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TripsRepository {
  private trips: Trip[] = [
    {
      id: 'trip-1',
      travellerId: 'seed-traveller-1',
      guideId: 'seed-guide-1',
      planId: 'plan-1',
      title: 'Kerala Backwaters Escape',
      destination: 'Alleppey',
      location: 'Kerala, India',
      startDate: '2025-07-01',
      endDate: '2025-07-06',
      status: TripStatus.UPCOMING,
      amount: 44000,
      guests: 2,
      durationLabel: '5 Nights / 6 Days',
      type: TripType.PACKAGE,
      itinerary: [
        { day: 'Day 1', title: 'Arrival', detail: 'Arrive in Kochi and transfer to houseboat.' },
      ],
      currentLocation: null,
      paymentBreakdown: { flights: 12000, stay: 21000, activities: 8000, guide: 3000 },
      documents: [{ id: 'doc-1', title: 'Booking Confirmation', status: 'issued' }],
    },
  ];

  create(data: Partial<Trip>): Trip {
    const trip: Trip = {
      id: data.id || uuidv4(),
      travellerId: data.travellerId!,
      guideId: data.guideId ?? '',
      planId: data.planId ?? '',
      title: data.title!,
      destination: data.destination!,
      location: data.location ?? '',
      startDate: data.startDate!,
      endDate: data.endDate!,
      status: data.status ?? TripStatus.UPCOMING,
      amount: data.amount!,
      guests: data.guests ?? 1,
      durationLabel: data.durationLabel ?? '',
      type: data.type ?? TripType.PACKAGE,
      itinerary: data.itinerary ?? [],
      currentLocation: data.currentLocation ?? null,
      paymentBreakdown: data.paymentBreakdown ?? { flights: 0, stay: 0, activities: 0, guide: 0 },
      documents: data.documents ?? [],
    };
    this.trips.push(trip);
    return trip;
  }

  findAll(): Trip[] {
    return [...this.trips].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );
  }

  findById(id: string): Trip | undefined {
    return this.trips.find((t) => t.id === id);
  }

  findByTraveller(travellerId: string): Trip[] {
    return this.trips
      .filter((t) => t.travellerId === travellerId)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }

  findByGuide(guideId: string): Trip[] {
    return this.trips
      .filter((t) => t.guideId === guideId)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }

  update(id: string, data: Partial<Trip>): Trip | undefined {
    const idx = this.trips.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    this.trips[idx] = { ...this.trips[idx], ...data };
    return this.trips[idx];
  }

  delete(id: string): boolean {
    const idx = this.trips.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    this.trips.splice(idx, 1);
    return true;
  }
}
