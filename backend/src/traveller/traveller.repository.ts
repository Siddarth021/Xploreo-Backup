import { Injectable } from '@nestjs/common';
import { Traveller, Interest } from './entities/traveller.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TravellerRepository {
  private travellers: Traveller[] = [
    {
      userId: 'seed-traveller-1',
      fname: 'Sara',
      lname: 'Patel',
      email: 'sara@xploreo.com',
      phno: 9123456789,
      plang: ['English', 'Gujarati'],
      bio: 'Loves exploring local cultures and street food',
      interests: [Interest.FOOD, Interest.CULTURE],
    },
  ];

  create(traveller: Traveller): Traveller {
    this.travellers.push(traveller);
    return traveller;
  }

  findAll(): Traveller[] {
    return this.travellers;
  }

  findById(userId: string): Traveller | undefined {
    return this.travellers.find((t) => t.userId === userId);
  }

  update(userId: string, data: Partial<Traveller>): Traveller | undefined {
    const idx = this.travellers.findIndex((t) => t.userId === userId);
    if (idx === -1) return undefined;
    this.travellers[idx] = { ...this.travellers[idx], ...data };
    return this.travellers[idx];
  }

  delete(userId: string): boolean {
    const idx = this.travellers.findIndex((t) => t.userId === userId);
    if (idx === -1) return false;
    this.travellers.splice(idx, 1);
    return true;
  }
}
