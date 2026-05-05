import { Injectable } from '@nestjs/common';
import {
  Experience,
  ExperienceCategory,
  ExperienceAvailability,
} from './entities/experience.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ExperiencesRepository {
  private experiences: Experience[] = [
    {
      id: 'exp-1',
      title: 'Western Ghats Trek',
      description: 'A guided trek through the lush Western Ghats forest trail.',
      destination: 'Coorg',
      category: ExperienceCategory.ADVENTURE,
      availability: ExperienceAvailability.AVAILABLE,
      price: 1800,
      durationHours: 6,
      capacity: 15,
      booked: 4,
      image: '',
      nextSlot: '2025-06-15',
      slots: [
        {
          id: 'slot-1',
          date: '2025-06-15',
          time: '07:00',
          booked: 4,
          capacity: 15,
          available: true,
        },
      ],
    },
  ];

  create(data: Partial<Experience>): Experience {
    const exp: Experience = {
      id: data.id || uuidv4(),
      title: data.title!,
      description: data.description!,
      destination: data.destination!,
      category: data.category!,
      availability: data.availability ?? ExperienceAvailability.AVAILABLE,
      price: data.price!,
      durationHours: data.durationHours!,
      capacity: data.capacity!,
      booked: data.booked ?? 0,
      image: data.image ?? '',
      nextSlot: data.nextSlot ?? '',
      slots: data.slots ?? [],
    };
    this.experiences.push(exp);
    return exp;
  }

  findAll(): Experience[] {
    return [...this.experiences].sort((a, b) => a.title.localeCompare(b.title));
  }

  findById(id: string): Experience | undefined {
    return this.experiences.find((e) => e.id === id);
  }

  findByLocation(locationId: string): Experience[] {
    const q = locationId.toLowerCase();
    return this.experiences.filter((e) =>
      e.destination.toLowerCase().includes(q),
    );
  }

  findByCategory(category: ExperienceCategory): Experience[] {
    return this.experiences.filter((e) => e.category === category);
  }

  update(id: string, data: Partial<Experience>): Experience | undefined {
    const idx = this.experiences.findIndex((e) => e.id === id);
    if (idx === -1) return undefined;
    this.experiences[idx] = { ...this.experiences[idx], ...data };
    return this.experiences[idx];
  }

  delete(id: string): boolean {
    const idx = this.experiences.findIndex((e) => e.id === id);
    if (idx === -1) return false;
    this.experiences.splice(idx, 1);
    return true;
  }
}
