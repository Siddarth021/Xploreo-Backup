import { Nontechadmin } from './entities/nontechadmin.entity';
export declare class NontechadminRepository {
    private admins;
    create(data: Omit<Nontechadmin, 'userId'> & {
        userId?: string;
    }): Nontechadmin;
    findAll(): Nontechadmin[];
    findById(userId: string): Nontechadmin | undefined;
    update(userId: string, data: Partial<Nontechadmin>): Nontechadmin | undefined;
    delete(userId: string): boolean;
}
