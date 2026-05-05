import { Nontechadmin } from './entities/nontechadmin.entity';
export declare class NontechadminRepository {
    private admins;
    create(data: Omit<Nontechadmin, 'adminId'>): Nontechadmin;
    findAll(): Nontechadmin[];
    findById(id: string): Nontechadmin | undefined;
    update(id: string, data: Partial<Nontechadmin>): Nontechadmin | undefined;
    delete(id: string): boolean;
}
