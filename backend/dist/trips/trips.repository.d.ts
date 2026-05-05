import { Trip } from './entities/trip.entity';
export declare class TripsRepository {
    private trips;
    create(data: Omit<Trip, 'tripId'>): Trip;
    findAll(): Trip[];
    findById(tripId: string): Trip | undefined;
    findByTraveller(travellerId: string): Trip[];
    findByGuide(guideId: string): Trip[];
    update(tripId: string, data: Partial<Trip>): Trip | undefined;
    delete(tripId: string): boolean;
}
