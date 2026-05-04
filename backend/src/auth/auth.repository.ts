import { Injectable } from '@nestjs/common';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthRepository {
  private credentials: Auth[] = [];

  createCredential(data: Auth) {
    this.credentials.push(data);
    return data;
  }

  findByUsername(username: String) {
    return this.credentials.find(c => c.username === username);
  }
}