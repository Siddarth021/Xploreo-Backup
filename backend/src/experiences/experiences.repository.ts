import { Injectable } from '@nestjs/common';
import {
  Experience,
  ExperienceAvailability,
  ExperienceCategory,
} from './entities/experience.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ExperiencesRepository {
  private experiences: Experience[] = [
    {
      experienceId: 'seed-exp-1',
      title: 'Sunrise Trek to Tiger Hill',
      description: 'A 4-hour guided trek to Tiger Hill with panoramic views',
      price: 1500,
      durationHours: 4,
      providerId: 'seed-provider-1',
      locationId: 'loc-darjeeling-1',
      category: ExperienceCategory.ADVENTURE,
      availability: ExperienceAvailability.AVAILABLE,
      maxParticipants: 15,
    },
  ];

  create(data: Omit<Experience, 'experienceId'>): Experience {
    const exp: Experience = { experienceId: uuidv4(), ...data };
    this.experiences.push(exp);
    return exp;
  }

  findAll(): Experience[] {
    return this.experiences;
  }

  findById(id: string): Experience | undefined {
    return this.experiences.find((e) => e.experienceId === id);
  }

  findByLocation(locationId: string): Experience[] {
    return this.experiences.filter((e) => e.locationId === locationId);
  }

  findByCategory(category: ExperienceCategory): Experience[] {
    return this.experiences.filter((e) => e.category === category);
  }

  update(id: string, data: Partial<Experience>): Experience | undefined {
    const idx = this.experiences.findIndex((e) => e.experienceId === id);
    if (idx === -1) return undefined;
    this.experiences[idx] = { ...this.experiences[idx], ...data };
    return this.experiences[idx];
  }

  delete(id: string): boolean {
    const idx = this.experiences.findIndex((e) => e.experienceId === id);
    if (idx === -1) return false;
    this.experiences.splice(idx, 1);
    return true;
  }
}
