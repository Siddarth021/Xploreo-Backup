import { TravellerRepository } from './traveller.repository';
import { CreateTravellerDto } from './dto/create-traveller.dto';
import { UpdateTravellerDto } from './dto/update-traveller.dto';
export declare class TravellerService {
    private readonly travellerRepository;
    constructor(travellerRepository: TravellerRepository);
    create(dto: CreateTravellerDto): import("./entities/traveller.entity").Traveller;
    findAll(): import("./entities/traveller.entity").Traveller[];
    findOne(id: string): import("./entities/traveller.entity").Traveller;
    update(id: string, dto: UpdateTravellerDto): import("./entities/traveller.entity").Traveller;
    remove(id: string): {
        message: string;
    };
}
