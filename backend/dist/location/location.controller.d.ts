import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(dto: CreateLocationDto): import("./entities/location.entity").Location;
    findAll(): import("./entities/location.entity").Location[];
    findByCity(cityId: string): import("./entities/location.entity").Location[];
    findOne(id: string): import("./entities/location.entity").Location;
    update(id: string, dto: UpdateLocationDto): import("./entities/location.entity").Location;
    remove(id: string): {
        message: string;
    };
}
