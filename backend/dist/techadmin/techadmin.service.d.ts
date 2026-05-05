import { TechadminRepository } from './techadmin.repository';
import { CreateTechadminDto } from './dto/create-techadmin.dto';
import { UpdateTechadminDto } from './dto/update-techadmin.dto';
import { CitiesService } from '../cities/cities.service';
export declare class TechadminService {
    private readonly repo;
    private readonly citiesService;
    constructor(repo: TechadminRepository, citiesService: CitiesService);
    create(dto: CreateTechadminDto): import("./entities/techadmin.entity").Techadmin;
    findAll(): import("./entities/techadmin.entity").Techadmin[];
    findOne(userId: string): import("./entities/techadmin.entity").Techadmin;
    update(userId: string, dto: UpdateTechadminDto): import("./entities/techadmin.entity").Techadmin;
    remove(userId: string): {
        message: string;
    };
}
