import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperiencesRepository } from './experiences.repository';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(private readonly expRepository: ExperiencesRepository) {}

  create(dto: CreateExperienceDto) {
    return this.expRepository.create(dto);
  }

  findAll() {
    return this.expRepository.findAll();
  }

  findOne(id: string) {
    const exp = this.expRepository.findById(id);
    if (!exp) throw new NotFoundException(`Experience ${id} not found`);
    return exp;
  }

  findByLocation(locationId: string) {
    return this.expRepository.findByLocation(locationId);
  }

  update(id: string, dto: UpdateExperienceDto) {
    const updated = this.expRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Experience ${id} not found`);
    return updated;
  }

  remove(id: string) {
    const deleted = this.expRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Experience ${id} not found`);
    return { message: `Experience ${id} deleted` };
  }
}
