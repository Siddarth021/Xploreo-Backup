import { LocationRepository } from './location.repository';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CitiesService } from '../cities/cities.service';
export declare class LocationService {
    private readonly locationRepository;
    private readonly citiesService;
    constructor(locationRepository: LocationRepository, citiesService: CitiesService);
    create(dto: CreateLocationDto): import("./entities/location.entity").Location;
    findAll(): import("./entities/location.entity").Location[];
    findOne(id: string): import("./entities/location.entity").Location;
    findByCity(cityId: string): import("./entities/location.entity").Location[];
    update(id: string, dto: UpdateLocationDto): import("./entities/location.entity").Location;
    remove(id: string): {
        message: string;
    };
}
