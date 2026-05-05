import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    create(dto: CreateTripDto): import("./entities/trip.entity").Trip;
    findAll(): import("./entities/trip.entity").Trip[];
    findByTraveller(travellerId: string): import("./entities/trip.entity").Trip[];
    findByGuide(guideId: string): import("./entities/trip.entity").Trip[];
    findOne(id: string): import("./entities/trip.entity").Trip;
    update(id: string, dto: UpdateTripDto): import("./entities/trip.entity").Trip;
    remove(id: string): {
        message: string;
    };
}
