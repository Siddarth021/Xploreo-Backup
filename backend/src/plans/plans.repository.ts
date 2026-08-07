import { Injectable } from '@nestjs/common';
import { Plan } from './entities/plan.entity';
import { createId } from '../common/utils/id';
import { normalizeStructuredItinerary } from '../common/utils/itinerary-mapper';

@Injectable()
export class PlansRepository {
  private plans: Plan[] = [
    {
      id: 'plan-1',
      title: 'Kerala Backwaters Escape',
      description: 'Relax in the serene backwaters of Alleppey with houseboat stays.',
      originCity: 'Bangalore',
      destination: 'Alleppey',
      durationNights: 5,
      pricePerPerson: 280,
      hotelStars: 4,
      includesFlight: true,
      image: '',
      tags: ['Backwaters', 'Relaxation', 'Kerala'],
      itinerary: normalizeStructuredItinerary([
        { day: 'Day 1', title: 'Arrival at COK & Transfer to Alleppey', detail: 'Meet your driver at Cochin International Airport (COK). Transfer via NH66 (approx 2.5 hours) to Alleppey. Check in to your premium houseboat by 12:30 PM.' },
        { day: 'Day 2', title: 'Vembanad Lake Cruise', detail: 'Full day serene cruise through the backwater canals. Enjoy traditional Kerala lunch on board.' },
        { day: 'Day 3', title: 'Kumarakom Village Tour', detail: 'Disembark and transfer to Kumarakom. Visit the Kumarakom Bird Sanctuary.' },
        { day: 'Day 4', title: 'Leisure & Ayurvedic Spa', detail: 'Relax at your resort with a complimentary 60-minute Ayurvedic spa session.' },
        { day: 'Day 5', title: 'Departure Transfer', detail: 'Check out at 10:00 AM and transfer back to COK airport for your return flight.' }
      ], {
        idPrefix: 'plan-1',
        originCity: 'Bangalore',
        destination: 'Alleppey',
        startDate: '2026-07-01',
        endDate: '2026-07-06',
        includesFlight: true,
        hotelStars: 4,
        airline: 'IndiGo',
        flightNumber: '6E-4215',
        fromAirportCode: 'BLR',
        toAirportCode: 'COK',
        departureTime: '08:30',
        arrivalTime: '09:45',
      }),
    },
    {
      id: 'plan-2',
      title: 'Rajasthan Heritage Tour',
      description: 'Explore the forts, palaces and culture of the royal state.',
      originCity: 'Delhi',
      destination: 'Jaipur',
      durationNights: 7,
      pricePerPerson: 450,
      hotelStars: 5,
      includesFlight: false,
      image: '',
      tags: ['Heritage', 'Culture', 'Rajasthan'],
      itinerary: normalizeStructuredItinerary([
        { day: 'Day 1', title: 'Arrival at Jaipur (JAI)', detail: 'Pick up from Jaipur Junction railway station or Jaipur Airport. Transfer to your heritage hotel and check in by 2:00 PM.' },
        { day: 'Day 2', title: 'Amber Fort & Jal Mahal', detail: 'Morning exploration of the grand Amber Fort. Afternoon photo stop at the picturesque Jal Mahal.' },
        { day: 'Day 3', title: 'City Palace & Hawa Mahal', detail: 'Discover the pink city architecture, Jantar Mantar, and shop at the local bazaars.' },
        { day: 'Day 4', title: 'Drive to Jodhpur', detail: 'Check out after breakfast and drive to Jodhpur via NH25 (approx 6 hours). Evening check-in at hotel.' },
        { day: 'Day 5', title: 'Mehrangarh Fort', detail: 'Guided tour of the majestic Mehrangarh Fort and the marble cenotaph at Jaswant Thada.' },
        { day: 'Day 6', title: 'Bishnoi Village Safari', detail: 'Experience authentic local culture and wildlife on a jeep safari through Bishnoi village.' },
        { day: 'Day 7', title: 'Departure Transfer', detail: 'Check out by 11:00 AM. Transfer to Jodhpur Airport (JDH) or Railway Station.' }
      ], {
        idPrefix: 'plan-2',
        originCity: 'Delhi',
        destination: 'Jaipur',
        startDate: '2026-08-01',
        endDate: '2026-08-08',
        includesFlight: false,
        hotelStars: 5,
      }),
    },
  ];

  create(data: Partial<Omit<Plan, 'itinerary'>> & { itinerary?: unknown }): Plan {
    const id = data.id || createId();
    const plan: Plan = {
      id,
      title: data.title!,
      description: data.description!,
      originCity: data.originCity!,
      destination: data.destination!,
      durationNights: data.durationNights!,
      pricePerPerson: data.pricePerPerson!,
      hotelStars: data.hotelStars!,
      includesFlight: data.includesFlight ?? true,
      image: data.image ?? '',
      tags: data.tags ?? [],
      itinerary: normalizeStructuredItinerary(data.itinerary, {
        idPrefix: id,
        originCity: data.originCity,
        destination: data.destination,
        includesFlight: data.includesFlight ?? true,
        hotelStars: data.hotelStars,
      }),
    };
    this.plans.push(plan);
    return plan;
  }

  findAll(options?: {
    page?: number;
    limit?: number;
    from?: string;
    to?: string;
    destination?: string;
  }): { items: Plan[]; total: number; page: number; limit: number } {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 50;
    let filtered = [...this.plans];

    if (options?.from) {
      const q = options.from.toLowerCase();
      filtered = filtered.filter((p) => p.originCity.toLowerCase().includes(q));
    }

    if (options?.to) {
      const q = options.to.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.destination.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q),
      );
    }

    if (options?.destination) {
      const q = options.destination.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.destination.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q),
      );
    }

    filtered.sort((a, b) =>
      a.destination.localeCompare(b.destination) || a.title.localeCompare(b.title),
    );

    const total = filtered.length;
    const items = filtered.slice((page - 1) * limit, page * limit);
    return { items, total, page, limit };
  }

  findById(id: string): Plan | undefined {
    return this.plans.find((p) => p.id === id);
  }

  update(
    id: string,
    data: Partial<Omit<Plan, 'itinerary'>> & { itinerary?: unknown },
  ): Plan | undefined {
    const idx = this.plans.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    this.plans[idx] = {
      ...this.plans[idx],
      ...data,
      itinerary: data.itinerary
        ? normalizeStructuredItinerary(data.itinerary, {
            idPrefix: id,
            originCity: data.originCity ?? this.plans[idx].originCity,
            destination: data.destination ?? this.plans[idx].destination,
            includesFlight: data.includesFlight ?? this.plans[idx].includesFlight,
            hotelStars: data.hotelStars ?? this.plans[idx].hotelStars,
          })
        : this.plans[idx].itinerary,
    };
    return this.plans[idx];
  }

  delete(id: string): boolean {
    const idx = this.plans.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.plans.splice(idx, 1);
    return true;
  }
}
