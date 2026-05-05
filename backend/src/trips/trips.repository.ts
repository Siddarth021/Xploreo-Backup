import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsRepository {
  constructor(
    @InjectRepository(Trip)
    private readonly repository: Repository<Trip>,
  ) {}

  create(data: Partial<Trip>): Promise<Trip> {
    return this.repository.save(this.repository.create(data));
  }

  findAll(): Promise<Trip[]> {
    return this.repository.find({ order: { startDate: 'DESC' } });
  }

  findById(id: string): Promise<Trip | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByTraveller(travellerId: string): Promise<Trip[]> {
    return this.repository.find({
      where: { travellerId },
      order: { startDate: 'DESC' },
    });
  }

  findByGuide(guideId: string): Promise<Trip[]> {
    return this.repository.find({
      where: { guideId },
      order: { startDate: 'DESC' },
    });
  }

  async update(id: string, data: Partial<Trip>): Promise<Trip | null> {
    await this.repository.update({ id }, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return Boolean(result.affected);
  }
}
