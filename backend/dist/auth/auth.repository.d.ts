import { Auth } from './entities/auth.entity';
export declare class AuthRepository {
    private credentials;
    create(data: Omit<Auth, 'userId'> & {
        userId?: string;
    }): Auth;
    findAll(): Auth[];
    findById(userId: string): Auth | undefined;
    findByUsername(username: string): Auth | undefined;
    update(userId: string, data: Partial<Auth>): Auth | undefined;
    delete(userId: string): boolean;
}
