import { Plan, Availability, TripCategory } from './entities/plan.entity';
export declare class PlansRepository {
    private plans;
    create(data: Omit<Plan, 'planId'>): Plan;
    findAll(options?: {
        page?: number;
        limit?: number;
        category?: TripCategory;
        destination?: string;
        availability?: Availability;
    }): {
        data: Plan[];
        total: number;
        page: number;
        limit: number;
    };
    findById(planId: string): Plan | undefined;
    update(planId: string, data: Partial<Plan>): Plan | undefined;
    delete(planId: string): boolean;
}
