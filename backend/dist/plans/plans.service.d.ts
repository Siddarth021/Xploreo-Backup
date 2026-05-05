import { PlansRepository } from './plans.repository';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { LocationService } from '../location/location.service';
export declare class PlansService {
    private readonly plansRepository;
    private readonly locationService;
    constructor(plansRepository: PlansRepository, locationService: LocationService);
    create(dto: CreatePlanDto): import("./entities/plan.entity").Plan;
    findAll(query: {
        page?: number;
        limit?: number;
        category?: string;
        destination?: string;
        availability?: string;
    }): {
        data: import("./entities/plan.entity").Plan[];
        total: number;
        page: number;
        limit: number;
    };
    findOne(id: string): import("./entities/plan.entity").Plan;
    update(id: string, dto: UpdatePlanDto): import("./entities/plan.entity").Plan;
    remove(id: string): {
        message: string;
    };
}
