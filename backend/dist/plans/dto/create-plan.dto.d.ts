import { Duration, Availability, TripCategory } from '../entities/plan.entity';
export declare class CreatePlanDto {
    title: string;
    desc: string;
    price: number;
    duration: Duration;
    destination: string;
    location: string[];
    category: TripCategory;
    availability: Availability;
}
