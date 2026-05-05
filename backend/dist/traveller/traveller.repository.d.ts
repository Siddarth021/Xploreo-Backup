import { Traveller } from './entities/traveller.entity';
export declare class TravellerRepository {
    private travellers;
    create(data: Omit<Traveller, 'userId'> & {
        userId?: string;
    }): Traveller;
    findAll(): Traveller[];
    findById(userId: string): Traveller | undefined;
    update(userId: string, data: Partial<Traveller>): Traveller | undefined;
    delete(userId: string): boolean;
}
