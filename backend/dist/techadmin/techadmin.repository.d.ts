import { Techadmin } from './entities/techadmin.entity';
export declare class TechadminRepository {
    private admins;
    create(data: Omit<Techadmin, 'adminId'>): Techadmin;
    findAll(): Techadmin[];
    findById(id: string): Techadmin | undefined;
    update(id: string, data: Partial<Techadmin>): Techadmin | undefined;
    delete(id: string): boolean;
}
