import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppState } from './entities/app-state.entity';

@Injectable()
export class AppStateService {
  constructor(
    @InjectRepository(AppState)
    private readonly appStateRepository: Repository<AppState>,
  ) {}

  async getBootstrapState() {
    const rows = await this.appStateRepository.find();
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  }

  async getState(key: string) {
    const row = await this.appStateRepository.findOne({ where: { key } });
    if (!row) {
      throw new NotFoundException(`App state "${key}" not found`);
    }

    return row.value;
  }

  async setState(key: string, value: unknown) {
    const row = this.appStateRepository.create({ key, value });
    await this.appStateRepository.save(row);
    return row.value;
  }
}
