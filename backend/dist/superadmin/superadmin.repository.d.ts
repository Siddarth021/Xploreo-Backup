import { Superadmin } from './entities/superadmin.entity';
export declare class SuperadminRepository {
    private admins;
    create(data: Omit<Superadmin, 'adminId'>): Superadmin;
    findAll(): Superadmin[];
    findById(id: string): Superadmin | undefined;
    update(id: string, data: Partial<Superadmin>): Superadmin | undefined;
    delete(id: string): boolean;
}
