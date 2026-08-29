import { Injectable } from '@nestjs/common';
import { Plan } from './entities/plan.entity';
import { createId } from '../common/utils/id';
import { normalizeStructuredItinerary } from '../common/utils/itinerary-mapper';

@Injectable()
export class PlansRepository {
  private plans: Plan[] = [];

  create(
    data: Partial<Omit<Plan, 'itinerary'>> & { itinerary?: unknown },
  ): Plan {
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

    filtered.sort(
      (a, b) =>
        a.destination.localeCompare(b.destination) ||
        a.title.localeCompare(b.title),
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
            includesFlight:
              data.includesFlight ?? this.plans[idx].includesFlight,
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
