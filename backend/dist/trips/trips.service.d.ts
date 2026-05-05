import { TripsRepository } from './trips.repository';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TravellerService } from '../traveller/traveller.service';
import { GuideService } from '../guide/guide.service';
import { PlansService } from '../plans/plans.service';
import { CitiesService } from '../cities/cities.service';
export declare class TripsService {
    private readonly tripsRepository;
    private readonly travellerService;
    private readonly guideService;
    private readonly plansService;
    private readonly citiesService;
    constructor(tripsRepository: TripsRepository, travellerService: TravellerService, guideService: GuideService, plansService: PlansService, citiesService: CitiesService);
    create(dto: CreateTripDto): import("./entities/trip.entity").Trip;
    findAll(): import("./entities/trip.entity").Trip[];
    findOne(id: string): import("./entities/trip.entity").Trip;
    findByTraveller(travellerId: string): import("./entities/trip.entity").Trip[];
    findByGuide(guideId: string): import("./entities/trip.entity").Trip[];
    update(id: string, dto: UpdateTripDto): import("./entities/trip.entity").Trip;
    remove(id: string): {
        message: string;
    };
}
