import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(dto: RegisterDto) {
    const existing = await this.authRepository.findByUsername(dto.username);
    if (existing) throw new ConflictException('Username already exists');

    const existingEmail = await this.authRepository.findByEmail(dto.email);
    if (existingEmail) throw new ConflictException('Email already exists');

    let user;
    try {
      user = await this.authRepository.create({
        userId: dto.username,
        username: dto.username,
        password: dto.password,
        role: dto.role,
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        status: 'active',
      });
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        String((error as { message?: string }).message || '').includes(
          'UNIQUE constraint failed: users.email',
        )
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }

    const { password: _pw, ...safe } = user;
    return { message: 'Registered successfully', user: safe };
  }

  async login(dto: LoginDto) {
    const user = await this.authRepository.findByUsername(dto.username);
    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Simulated token — in production replace with JWT
    const token = Buffer.from(`${user.userId}:${user.role}`).toString('base64');
    const { password: _pw, ...safe } = user;
    return {
      token,
      user: safe,
      hint: `Add headers: x-user-id: ${user.userId}  x-user-role: ${user.role}`,
    };
  }

  async findAll() {
    const users = await this.authRepository.findAll();
    return users.map(({ password: _pw, ...u }) => u);
  }

  async findOne(id: string) {
    const user = await this.authRepository.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    const { password: _pw, ...safe } = user;
    return safe;
  }

  async update(id: string, dto: UpdateAuthDto) {
    const updated = await this.authRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`User ${id} not found`);
    const { password: _pw, ...safe } = updated;
    return safe;
  }

  async remove(id: string) {
    const deleted = await this.authRepository.delete(id);
    if (!deleted) throw new NotFoundException(`User ${id} not found`);
    return { message: `User ${id} deleted` };
  }
}
