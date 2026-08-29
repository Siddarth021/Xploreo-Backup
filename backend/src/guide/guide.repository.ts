import { Injectable } from '@nestjs/common';
import { Guide } from './entities/guide.entity';

@Injectable()
export class GuideRepository {
  private guides: Guide[] = [
    {
      userId: '10001',
      fname: 'Sreekar',
      lname: 'K',
      email: 'sreekar@gmail.com',
      phone: 9876543210,
      location: 'loc-mumbai-1',
      prof_title: 'Senior Trek Guide',
      years_exp: 7,
      bio: 'Expert mountain guide with 7+ years experience in trekking and outdoor adventures',
      lang_spoken: ['English', 'Hindi', 'Marathi'],
      certifications: ['First Aid', 'Mountain Rescue'],
      bank_name: 'HDFC Bank',
      bank_acc_num_end: 1234,
      iban: 'IN123456789012345678',
      pricePerDay: 1500,
      rating: 0,
      totalRatings: 0,
      avatar: undefined,
    },
    {
      userId: '10002',
      fname: 'Aman',
      lname: 'Sidd',
      email: 'aman@gmail.com',
      phone: 9876543211,
      location: 'loc-mumbai-1',
      prof_title: 'Local Culture Guide',
      years_exp: 5,
      bio: 'Deeply passionate about Mumbai culture and history.',
      lang_spoken: ['English', 'Hindi', 'Marathi'],
      certifications: ['City Tour Specialist'],
      bank_name: 'SBI Bank',
      bank_acc_num_end: 5678,
      iban: 'IN123456789012345679',
      pricePerDay: 1200,
      rating: 0,
      totalRatings: 0,
      avatar: undefined,
    },
  ];

  create(guide: Guide): Guide {
    this.guides.push(guide);
    return guide;
  }

  findAll(): Guide[] {
    return this.guides;
  }

  findById(userId: string): Guide | undefined {
    return this.guides.find((g) => g.userId === userId);
  }

  findByLocation(locationId: string): Guide[] {
    return this.guides.filter((g) => g.location === locationId);
  }

  update(userId: string, data: Partial<Guide>): Guide | undefined {
    const idx = this.guides.findIndex((g) => g.userId === userId);
    if (idx === -1) return undefined;
    this.guides[idx] = { ...this.guides[idx], ...data };
    return this.guides[idx];
  }

  delete(userId: string): boolean {
    const idx = this.guides.findIndex((g) => g.userId === userId);
    if (idx === -1) return false;
    this.guides.splice(idx, 1);
    return true;
  }
}
