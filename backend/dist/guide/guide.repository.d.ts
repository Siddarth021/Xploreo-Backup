import { Guide } from './entities/guide.entity';
export declare class GuideRepository {
    private guides;
    create(guide: Guide): Guide;
    findAll(): Guide[];
    findById(userId: string): Guide | undefined;
    findByLocation(locationId: string): Guide[];
    update(userId: string, data: Partial<Guide>): Guide | undefined;
    delete(userId: string): boolean;
}
