import { Role } from '../entities/auth.entity';
export declare class RegisterDto {
    userId?: string;
    username: string;
    email?: string;
    password: string;
    role?: Role;
}
