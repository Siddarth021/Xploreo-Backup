import { TripStatus } from '../entities/trip.entity';
export declare class CreateTripDto {
    travellerId: string;
    planId: string;
    guideId: string;
    sourceCityId: string;
    destCityId: string;
    servicePartners: string[];
    locations: string[];
    startDate: string;
    endDate: string;
    status: TripStatus;
    totalCost: number;
}
