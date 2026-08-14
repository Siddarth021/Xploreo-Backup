import { Injectable } from '@nestjs/common';
import { Auth, Role } from './entities/auth.entity';
import { createId } from '../common/utils/id';

@Injectable()
export class AuthRepository {
  private users: Auth[] = [
    {
      userId: '20001',
      username: 'anjali_s',
      password: 'anjali@123',
      role: 'traveller' as Auth['role'],
      name: 'Anjali Sharma',
      email: 'anjali@xploreo.com',
      phone: '9123456780',
      status: 'active',
    },

    {
      userId: '10001',
      username: 'sreekar_k',
      password: 'sreekar',
      role: 'guide' as Auth['role'],
      name: 'Sreekar',
      email: 'sreekar@gmail.com',
      phone: '9876543210',
      status: 'active',
    },
    {
      userId: '00001',
      username: 'rahul_v',
      password: 'rahul@123',
      role: 'superadmin' as Auth['role'],
      name: 'Rahul Varma',
      email: 'rahul@xploreo.com',
      phone: '9876543210',
      status: 'active',
    },
    {
      userId: 'TA0001',
      username: 'TA001',
      password: 'rahul@123',
      role: 'techadmin' as Auth['role'],
      name: 'Rahul Varma',
      email: 'rahul@xploreo.com',
      phone: '9876543210',
      status: 'active',
    },
    {
      userId: 'NTA0001',
      username: 'nontech_admin',
      password: 'admin@123',
      role: Role.NONTECHADMIN,
      name: 'Neha Mehra',
      email: 'nontech.admin@xploreo.com',
      phone: '9000000003',
      status: 'active',
    },
    {
      userId: 'partner-1',
      username: 'hotel_partner',
      password: 'hotel@123',
      role: Role.HOTEL,
      name: 'Xploreo Hotel Partner',
      email: 'hotel.partner@xploreo.com',
      phone: '9000000001',
      status: 'active',
    },
    {
      userId: 'experience-partner-1',
      username: 'experience_partner',
      password: 'experience@123',
      role: Role.EXPERIENCE,
      name: 'Xploreo Experience Partner',
      email: 'experience.partner@xploreo.com',
      phone: '9000000002',
      status: 'active',
    },
  ];

  create(data: Partial<Auth>): Auth {
    const user: Auth = {
      userId: data.userId || createId(),
      username: data.username!,
      password: data.password!,
      role: data.role!,
      name: data.name!,
      email: data.email!,
      phone: data.phone!,
      status: data.status ?? 'active',
    };
    this.users.push(user);
    return user;
  }

  findAll(): Auth[] {
    return [...this.users].sort((a, b) => a.name.localeCompare(b.name));
  }

  findById(userId: string): Auth | undefined {
    return this.users.find((u) => u.userId === userId);
  }

  findByUsername(username: string): Auth | undefined {
    return this.users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase(),
    );
  }

  findByEmail(email: string): Auth | undefined {
    return this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
  }

  update(userId: string, data: Partial<Auth>): Auth | undefined {
    const idx = this.users.findIndex((u) => u.userId === userId);
    if (idx === -1) return undefined;
    this.users[idx] = { ...this.users[idx], ...data };
    return this.users[idx];
  }

  delete(userId: string): boolean {
    const idx = this.users.findIndex((u) => u.userId === userId);
    if (idx === -1) return false;
    this.users.splice(idx, 1);
    return true;
  }
}
