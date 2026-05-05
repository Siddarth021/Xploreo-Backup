import { TechadminRepository } from './techadmin.repository';
import { CreateTechadminDto } from './dto/create-techadmin.dto';
import { UpdateTechadminDto } from './dto/update-techadmin.dto';
export declare class TechadminService {
    private readonly repo;
    constructor(repo: TechadminRepository);
    create(dto: CreateTechadminDto): import("./entities/techadmin.entity").Techadmin;
    findAll(): import("./entities/techadmin.entity").Techadmin[];
    findOne(id: string): import("./entities/techadmin.entity").Techadmin;
    update(id: string, dto: UpdateTechadminDto): import("./entities/techadmin.entity").Techadmin;
    remove(id: string): {
        message: string;
    };
}
