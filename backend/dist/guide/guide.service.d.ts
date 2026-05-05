import { GuideRepository } from './guide.repository';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
export declare class GuideService {
    private readonly guideRepository;
    constructor(guideRepository: GuideRepository);
    create(dto: CreateGuideDto): import("./entities/guide.entity").Guide;
    findAll(): import("./entities/guide.entity").Guide[];
    findOne(id: string): import("./entities/guide.entity").Guide;
    findByLocation(locationId: string): import("./entities/guide.entity").Guide[];
    update(id: string, dto: UpdateGuideDto): import("./entities/guide.entity").Guide;
    remove(id: string): {
        message: string;
    };
}
