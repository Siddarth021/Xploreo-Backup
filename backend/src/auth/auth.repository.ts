import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Auth)
    private readonly repository: Repository<Auth>,
  ) {}

  create(data: Partial<Auth>): Promise<Auth> {
    const record = this.repository.create(data);
    return this.repository.save(record);
  }

  findAll(): Promise<Auth[]> {
    return this.repository.find({ order: { name: 'ASC' } });
  }

  findById(userId: string): Promise<Auth | null> {
    return this.repository.findOne({ where: { userId } });
  }

  findByUsername(username: string): Promise<Auth | null> {
    return this.repository.findOne({ where: { username } });
  }

  async update(userId: string, data: Partial<Auth>): Promise<Auth | null> {
    await this.repository.update({ userId }, data);
    return this.findById(userId);
  }

  async delete(userId: string): Promise<boolean> {
    const result = await this.repository.delete({ userId });
    return Boolean(result.affected);
  }
}
