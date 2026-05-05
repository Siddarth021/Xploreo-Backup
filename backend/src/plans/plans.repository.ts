import { Injectable } from '@nestjs/common';
import { Plan } from './entities/plan.entity';
import { v4 as uuidv4 } from 'uuid';

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
      pricePerPerson: 22000,
      hotelStars: 4,
      includesFlight: true,
      image: '',
      tags: ['Backwaters', 'Relaxation', 'Kerala'],
      itinerary: [
        { day: 'Day 1', title: 'Arrival in Kochi', detail: 'Transfer to Alleppey and check in to houseboat.' },
        { day: 'Day 2', title: 'Backwater Cruise', detail: 'Full day cruise through the canals.' },
      ],
    },
    {
      id: 'plan-2',
      title: 'Rajasthan Heritage Tour',
      description: 'Explore the forts, palaces and culture of the royal state.',
      originCity: 'Delhi',
      destination: 'Jaipur',
      durationNights: 7,
      pricePerPerson: 35000,
      hotelStars: 5,
      includesFlight: false,
      image: '',
      tags: ['Heritage', 'Culture', 'Rajasthan'],
      itinerary: [
        { day: 'Day 1', title: 'Jaipur Arrival', detail: 'Check in and visit City Palace.' },
        { day: 'Day 2', title: 'Amber Fort', detail: 'Explore the grand Amber Fort.' },
      ],
    },
  ];

  create(data: Partial<Plan>): Plan {
    const plan: Plan = {
      id: data.id || uuidv4(),
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
      itinerary: data.itinerary ?? [],
    };
    this.plans.push(plan);
    return plan;
  }

  findAll(options?: {
    page?: number;
    limit?: number;
    destination?: string;
  }): { data: Plan[]; total: number; page: number; limit: number } {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 50;
    let filtered = [...this.plans];

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
    const data = filtered.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit };
  }

  findById(id: string): Plan | undefined {
    return this.plans.find((p) => p.id === id);
  }

  update(id: string, data: Partial<Plan>): Plan | undefined {
    const idx = this.plans.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    this.plans[idx] = { ...this.plans[idx], ...data };
    return this.plans[idx];
  }

  delete(id: string): boolean {
    const idx = this.plans.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.plans.splice(idx, 1);
    return true;
  }
}
