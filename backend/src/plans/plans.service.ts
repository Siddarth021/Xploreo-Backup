import { Injectable, NotFoundException } from '@nestjs/common';
import { PlansRepository } from './plans.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly plansRepository: PlansRepository) {}

  create(dto: CreatePlanDto) {
    return this.plansRepository.create(dto);
  }

  findAll(query: {
    page?: number;
    limit?: number;
    destination?: string;
  }) {
    return this.plansRepository.findAll({
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 10,
      destination: query.destination,
    });
  }

  async findOne(id: string) {
    const plan = await this.plansRepository.findById(id);
    if (!plan) throw new NotFoundException(`Plan ${id} not found`);
    return plan;
  }

  async update(id: string, dto: UpdatePlanDto) {
    const updated = await this.plansRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Plan ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.plansRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Plan ${id} not found`);
    return { message: `Plan ${id} deleted` };
  }
}
