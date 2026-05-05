import { Experience, ExperienceCategory } from './entities/experience.entity';
export declare class ExperiencesRepository {
    private experiences;
    create(data: Omit<Experience, 'experienceId'>): Experience;
    findAll(): Experience[];
    findById(id: string): Experience | undefined;
    findByLocation(locationId: string): Experience[];
    findByCategory(category: ExperienceCategory): Experience[];
    update(id: string, data: Partial<Experience>): Experience | undefined;
    delete(id: string): boolean;
}
