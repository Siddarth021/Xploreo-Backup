import { Injectable, NotFoundException } from '@nestjs/common';
import { PlansRepository } from './plans.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Availability, TripCategory } from './entities/plan.entity';

@Injectable()
export class PlansService {
  constructor(private readonly plansRepository: PlansRepository) {}

  create(dto: CreatePlanDto) {
    return this.plansRepository.create(dto);
  }

  findAll(query: {
    page?: number;
    limit?: number;
    category?: string;
    destination?: string;
    availability?: string;
  }) {
    return this.plansRepository.findAll({
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 10,
      category: query.category as TripCategory | undefined,
      destination: query.destination,
      availability: query.availability as Availability | undefined,
    });
  }

  findOne(id: string) {
    const plan = this.plansRepository.findById(id);
    if (!plan) throw new NotFoundException(`Plan ${id} not found`);
    return plan;
  }

  update(id: string, dto: UpdatePlanDto) {
    const updated = this.plansRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Plan ${id} not found`);
    return updated;
  }

  remove(id: string) {
    const deleted = this.plansRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Plan ${id} not found`);
    return { message: `Plan ${id} deleted` };
  }
}
