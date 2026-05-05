import { TripStatus } from '../entities/trip.entity';
export declare class CreateTripDto {
    travellerId: string;
    planId: string;
    guideId: string;
    sourceCity: string;
    destCity: string;
    servicePartners: string[];
    locations: string[];
    startDate: string;
    endDate: string;
    status: TripStatus;
    totalCost: number;
}
