import { Injectable } from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthRepository {
  private users: Auth[] = [];

  create(data: Partial<Auth>): Auth {
    const user: Auth = {
      userId: data.userId || uuidv4(),
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
