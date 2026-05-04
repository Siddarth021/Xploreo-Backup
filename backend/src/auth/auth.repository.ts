import { Injectable } from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthRepository {
  private credentials: Auth[] = [];

  createCredential(data: Auth) {
    this.credentials.push(data);
    return data;
  }

  findByUsername(username: string) {
    return this.credentials.find(c => c.username === username);
  }
}