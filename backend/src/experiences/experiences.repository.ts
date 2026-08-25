import { Injectable } from '@nestjs/common';
import {
  Experience,
  ExperienceCategory,
  ExperienceAvailability,
} from './entities/experience.entity';
import { createId } from '../common/utils/id';

@Injectable()
export class ExperiencesRepository {
  private experiences: Experience[] = [];

  create(partnerId: string, data: Partial<Experience>): Experience {
    const exp: Experience = {
      id: data.id || createId(),
      partnerId,
      title: data.title!,
      description: data.description!,
      destination: data.destination!,
      category: data.category!,
      availability: data.availability ?? ExperienceAvailability.AVAILABLE,
      price: data.price!,
      durationHours: data.durationHours!,
      capacity: data.capacity ?? 0,
      booked: data.booked ?? 0,
      image: data.image ?? '',
      nextSlot: data.nextSlot ?? '',
      slots: data.slots ?? [],
    };
    this.experiences.push(exp);
    return cloneExperience(exp);
  }

  findAll(): Experience[] {
    return [...this.experiences]
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(cloneExperience);
  }

  findById(id: string): Experience | undefined {
    const experience = this.experiences.find((e) => e.id === id);
    return experience ? cloneExperience(experience) : undefined;
  }

  findByPartnerId(partnerId: string): Experience[] {
    return this.experiences
      .filter((experience) => experience.partnerId === partnerId)
      .map(cloneExperience);
  }

  findByLocation(locationId: string): Experience[] {
    const q = locationId.toLowerCase();
    return this.experiences
      .filter((e) => e.destination.toLowerCase().includes(q))
      .map(cloneExperience);
  }

  findByCategory(category: ExperienceCategory): Experience[] {
    return this.experiences
      .filter((e) => e.category === category)
      .map(cloneExperience);
  }

  update(id: string, data: Partial<Experience>): Experience | undefined {
    const idx = this.experiences.findIndex((e) => e.id === id);
    if (idx === -1) return undefined;
    this.experiences[idx] = { ...this.experiences[idx], ...data };
    return cloneExperience(this.experiences[idx]);
  }

  delete(id: string): boolean {
    const idx = this.experiences.findIndex((e) => e.id === id);
    if (idx === -1) return false;
    this.experiences.splice(idx, 1);
    return true;
  }
}

function cloneExperience(experience: Experience): Experience {
  return {
    ...experience,
    slots: experience.slots.map((slot) => ({ ...slot })),
  };
}
