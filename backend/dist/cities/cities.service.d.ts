import { CitiesRepository } from './cities.repository';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
export declare class CitiesService {
    private readonly citiesRepository;
    constructor(citiesRepository: CitiesRepository);
    create(dto: CreateCityDto): import("./entities/city.entity").City;
    findAll(): import("./entities/city.entity").City[];
    findOne(cityId: string): import("./entities/city.entity").City;
    update(cityId: string, dto: UpdateCityDto): import("./entities/city.entity").City;
    remove(cityId: string): {
        message: string;
    };
}
