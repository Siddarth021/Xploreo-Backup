import { Injectable } from '@nestjs/common';
import {
  Plan,
  Availability,
  Duration,
  TripCategory,
} from './entities/plan.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlansRepository {
  private plans: Plan[] = [
    {
      planId: 'seed-plan-1',
      title: 'Golden Triangle Tour',
      desc: 'Explore Delhi, Agra and Jaipur in 7 days',
      price: 25000,
      duration: Duration.SEVEN_DAYS_SIX_NIGHTS,
      destination: 'Rajasthan',
      location: ['loc-delhi-1', 'loc-agra-1', 'loc-jaipur-1'],
      category: TripCategory.ADVENTURE,
      availability: Availability.A,
    },
    {
      planId: 'seed-plan-2',
      title: 'Kerala Backwaters Luxury',
      desc: 'Luxury houseboat experience through Kerala backwaters',
      price: 45000,
      duration: Duration.FIVE_DAYS_FOUR_NIGHTS,
      destination: 'Kerala',
      location: ['loc-cochin-1', 'loc-alleppey-1'],
      category: TripCategory.LUXURY,
      availability: Availability.A,
    },
  ];

  create(data: Omit<Plan, 'planId'>): Plan {
    const plan: Plan = { planId: uuidv4(), ...data };
    this.plans.push(plan);
    return plan;
  }

  findAll(options?: {
    page?: number;
    limit?: number;
    category?: TripCategory;
    destination?: string;
    availability?: Availability;
  }): { data: Plan[]; total: number; page: number; limit: number } {
    let filtered = [...this.plans];

    if (options?.category) {
      filtered = filtered.filter((p) => p.category === options.category);
    }
    if (options?.destination) {
      filtered = filtered.filter((p) =>
        p.destination
          .toLowerCase()
          .includes(options.destination!.toLowerCase()),
      );
    }
    if (options?.availability) {
      filtered = filtered.filter((p) => p.availability === options.availability);
    }

    const total = filtered.length;
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total, page, limit };
  }

  findById(planId: string): Plan | undefined {
    return this.plans.find((p) => p.planId === planId);
  }

  update(planId: string, data: Partial<Plan>): Plan | undefined {
    const idx = this.plans.findIndex((p) => p.planId === planId);
    if (idx === -1) return undefined;
    this.plans[idx] = { ...this.plans[idx], ...data };
    return this.plans[idx];
  }

  delete(planId: string): boolean {
    const idx = this.plans.findIndex((p) => p.planId === planId);
    if (idx === -1) return false;
    this.plans.splice(idx, 1);
    return true;
  }
}
