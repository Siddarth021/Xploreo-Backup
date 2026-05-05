import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';

@Injectable()
export class PlansRepository {
  constructor(
    @InjectRepository(Plan)
    private readonly repository: Repository<Plan>,
  ) {}

  create(data: Partial<Plan>): Promise<Plan> {
    return this.repository.save(this.repository.create(data));
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
    destination?: string;
  }): Promise<{ data: Plan[]; total: number; page: number; limit: number }> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;

    const where = options?.destination
      ? [{ destination: ILike(`%${options.destination}%`) }, { title: ILike(`%${options.destination}%`) }]
      : undefined;

    const [data, total] = await this.repository.findAndCount({
      where,
      order: { destination: 'ASC', title: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  findById(id: string): Promise<Plan | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<Plan>): Promise<Plan | null> {
    await this.repository.update({ id }, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return Boolean(result.affected);
  }
}
