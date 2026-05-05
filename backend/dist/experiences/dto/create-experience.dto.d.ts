import { ExperienceCategory, ExperienceAvailability } from '../entities/experience.entity';
export declare class CreateExperienceDto {
    title: string;
    description: string;
    price: number;
    durationHours: number;
    providerId: string;
    locationId: string;
    category: ExperienceCategory;
    availability: ExperienceAvailability;
    maxParticipants: number;
}
