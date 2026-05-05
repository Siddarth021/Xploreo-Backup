import { NontechadminRepository } from './nontechadmin.repository';
import { CreateNontechadminDto } from './dto/create-nontechadmin.dto';
import { UpdateNontechadminDto } from './dto/update-nontechadmin.dto';
import { CitiesService } from '../cities/cities.service';
export declare class NontechadminService {
    private readonly repo;
    private readonly citiesService;
    constructor(repo: NontechadminRepository, citiesService: CitiesService);
    create(dto: CreateNontechadminDto): import("./entities/nontechadmin.entity").Nontechadmin;
    findAll(): import("./entities/nontechadmin.entity").Nontechadmin[];
    findOne(userId: string): import("./entities/nontechadmin.entity").Nontechadmin;
    update(userId: string, dto: UpdateNontechadminDto): import("./entities/nontechadmin.entity").Nontechadmin;
    remove(userId: string): {
        message: string;
    };
}
