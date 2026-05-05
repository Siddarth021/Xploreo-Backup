import { Superadmin } from './entities/superadmin.entity';
export declare class SuperadminRepository {
    private admins;
    create(data: Omit<Superadmin, 'userId'> & {
        userId?: string;
    }): Superadmin;
    findAll(): Superadmin[];
    findById(userId: string): Superadmin | undefined;
    update(userId: string, data: Partial<Superadmin>): Superadmin | undefined;
    delete(userId: string): boolean;
}
