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

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  register(dto: RegisterDto) {
    const existing = this.authRepository.findByUsername(dto.username);
    if (existing) throw new ConflictException('Username already exists');

    const user = this.authRepository.create({
      username: dto.username,
      password: dto.password,
      role: dto.role,
    });

    const { password: _pw, ...safe } = user;
    return { message: 'Registered successfully', user: safe };
  }

  login(dto: LoginDto) {
    const user = this.authRepository.findByUsername(dto.username);
    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { userId: user.userId, role: user.role };
    const token = jwt.sign(payload, 'XPLOREO_SECRET_KEY', { expiresIn: '1h' });
    const { password: _pw, ...safe } = user;
    return {
      message: 'Login successful',
      token,
      user: safe,
    };
  }

  findAll() {
    return this.authRepository.findAll().map(({ password: _pw, ...u }) => u);
  }

  findOne(id: string) {
    const user = this.authRepository.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    const { password: _pw, ...safe } = user;
    return safe;
  }

  update(id: string, dto: UpdateAuthDto) {
    const updated = this.authRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`User ${id} not found`);
    const { password: _pw, ...safe } = updated;
    return safe;
  }

  remove(id: string) {
    const deleted = this.authRepository.delete(id);
    if (!deleted) throw new NotFoundException(`User ${id} not found`);
    return { message: `User ${id} deleted` };
  }
}
