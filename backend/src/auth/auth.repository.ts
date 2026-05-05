import { Injectable } from '@nestjs/common';
import { Auth, Role } from './entities/auth.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthRepository {
  private credentials: Auth[] = [
    {
      userId: 'seed-superadmin-1',
      username: 'superadmin',
      password: 'admin123',
      role: Role.SUPERADMIN,
    },
    {
      userId: 'seed-guide-1',
      username: 'guide_ali',
      password: 'guide123',
      role: Role.GUIDE,
    },
    {
      userId: 'seed-traveller-1',
      username: 'traveller_sara',
      password: 'travel123',
      role: Role.TRAVELLER,
    },
  ];

  create(data: Omit<Auth, 'userId'>): Auth {
    const record: Auth = { userId: uuidv4(), ...data };
    this.credentials.push(record);
    return record;
  }

  findAll(): Auth[] {
    return this.credentials;
  }

  findById(userId: string): Auth | undefined {
    return this.credentials.find((c) => c.userId === userId);
  }

  findByUsername(username: string): Auth | undefined {
    return this.credentials.find((c) => c.username === username);
  }

  update(userId: string, data: Partial<Auth>): Auth | undefined {
    const idx = this.credentials.findIndex((c) => c.userId === userId);
    if (idx === -1) return undefined;
    this.credentials[idx] = { ...this.credentials[idx], ...data };
    return this.credentials[idx];
  }

  delete(userId: string): boolean {
    const idx = this.credentials.findIndex((c) => c.userId === userId);
    if (idx === -1) return false;
    this.credentials.splice(idx, 1);
    return true;
  }
}