import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    create(dto: CreatePlanDto): import("./entities/plan.entity").Plan;
    findAll(page?: number, limit?: number, category?: string, destination?: string, availability?: string): {
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
