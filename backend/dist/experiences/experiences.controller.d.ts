import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
export declare class ExperiencesController {
    private readonly experiencesService;
    constructor(experiencesService: ExperiencesService);
    create(dto: CreateExperienceDto): import("./entities/experience.entity").Experience;
    findAll(): import("./entities/experience.entity").Experience[];
    findByLocation(locationId: string): import("./entities/experience.entity").Experience[];
    findOne(id: string): import("./entities/experience.entity").Experience;
    update(id: string, dto: UpdateExperienceDto): import("./entities/experience.entity").Experience;
    remove(id: string): {
        message: string;
    };
}
