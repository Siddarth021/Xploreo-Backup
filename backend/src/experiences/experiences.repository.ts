import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Experience, ExperienceCategory } from './entities/experience.entity';

@Injectable()
export class ExperiencesRepository {
  constructor(
    @InjectRepository(Experience)
    private readonly repository: Repository<Experience>,
  ) {}

  create(data: Partial<Experience>): Promise<Experience> {
    return this.repository.save(this.repository.create(data));
  }

  findAll(): Promise<Experience[]> {
    return this.repository.find({ order: { title: 'ASC' } });
  }

  findById(id: string): Promise<Experience | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByLocation(locationId: string): Promise<Experience[]> {
    return this.repository.find({
      where: { destination: ILike(`%${locationId}%`) },
      order: { title: 'ASC' },
    });
  }

  findByCategory(category: ExperienceCategory): Promise<Experience[]> {
    return this.repository.find({ where: { category } });
  }

  async update(id: string, data: Partial<Experience>): Promise<Experience | null> {
    await this.repository.update({ id }, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return Boolean(result.affected);
  }
}
