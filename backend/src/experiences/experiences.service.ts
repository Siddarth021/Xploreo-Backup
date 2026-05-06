import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExperiencesRepository } from './experiences.repository';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(private readonly expRepository: ExperiencesRepository) {}

  create(partnerId: string | undefined, dto: CreateExperienceDto) {
    if (!partnerId) {
      throw new ForbiddenException(
        'x-user-id header is required for EXPERIENCE_PARTNER',
      );
    }

    return this.expRepository.create(partnerId, {
      ...dto,
      availability: dto.availability ?? undefined,
      booked: dto.booked ?? 0,
      image: dto.image ?? '',
      nextSlot: dto.nextSlot ?? '',
      slots: dto.slots ?? [],
    });
  }

  findAll() {
    return this.expRepository.findAll();
  }

  findForPartner(partnerId: string | undefined) {
    if (!partnerId) {
      throw new ForbiddenException(
        'x-user-id header is required for EXPERIENCE_PARTNER',
      );
    }

    return this.expRepository.findByPartnerId(partnerId);
  }

  async findOne(id: string) {
    const exp = await this.expRepository.findById(id);
    if (!exp) throw new NotFoundException(`Experience ${id} not found`);
    return exp;
  }

  findByLocation(locationId: string) {
    return this.expRepository.findByLocation(locationId);
  }

  async update(id: string, dto: UpdateExperienceDto) {
    const updated = await this.expRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Experience ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.expRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Experience ${id} not found`);
    return { message: `Experience ${id} deleted` };
  }
}
