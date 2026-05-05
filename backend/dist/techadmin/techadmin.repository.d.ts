import { Techadmin } from './entities/techadmin.entity';
export declare class TechadminRepository {
    private admins;
    create(data: Omit<Techadmin, 'userId'> & {
        userId?: string;
    }): Techadmin;
    findAll(): Techadmin[];
    findById(userId: string): Techadmin | undefined;
    update(userId: string, data: Partial<Techadmin>): Techadmin | undefined;
    delete(userId: string): boolean;
}
