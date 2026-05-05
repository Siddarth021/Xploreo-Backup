import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CitiesController {
    private readonly citiesService;
    constructor(citiesService: CitiesService);
    create(dto: CreateCityDto): import("./entities/city.entity").City;
    findAll(): import("./entities/city.entity").City[];
    findOne(id: string): import("./entities/city.entity").City;
    update(id: string, dto: UpdateCityDto): import("./entities/city.entity").City;
    remove(id: string): {
        message: string;
    };
}
