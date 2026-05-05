import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsRepository {
  constructor(
    @InjectRepository(Hotel)
    private readonly repository: Repository<Hotel>,
  ) {}

  create(data: Partial<Hotel>): Promise<Hotel> {
    return this.repository.save(this.repository.create(data));
  }

  findAll(): Promise<Hotel[]> {
    return this.repository.find({ order: { city: 'ASC', name: 'ASC' } });
  }

  findById(id: string): Promise<Hotel | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByLocation(locationId: string): Promise<Hotel[]> {
    return this.repository.find({
      where: [{ city: ILike(`%${locationId}%`) }, { location: ILike(`%${locationId}%`) }],
      order: { name: 'ASC' },
    });
  }

  async update(id: string, data: Partial<Hotel>): Promise<Hotel | null> {
    await this.repository.update({ id }, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return Boolean(result.affected);
  }
}
