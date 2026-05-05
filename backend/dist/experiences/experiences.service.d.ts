import { ExperiencesRepository } from './experiences.repository';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
export declare class ExperiencesService {
    private readonly expRepository;
    constructor(expRepository: ExperiencesRepository);
    create(dto: CreateExperienceDto): import("./entities/experience.entity").Experience;
    findAll(): import("./entities/experience.entity").Experience[];
    findOne(id: string): import("./entities/experience.entity").Experience;
    findByLocation(locationId: string): import("./entities/experience.entity").Experience[];
    update(id: string, dto: UpdateExperienceDto): import("./entities/experience.entity").Experience;
    remove(id: string): {
        message: string;
    };
}
