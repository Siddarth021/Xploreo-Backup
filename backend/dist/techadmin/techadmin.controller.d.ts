import { TechadminService } from './techadmin.service';
import { CreateTechadminDto } from './dto/create-techadmin.dto';
import { UpdateTechadminDto } from './dto/update-techadmin.dto';
export declare class TechadminController {
    private readonly techadminService;
    constructor(techadminService: TechadminService);
    create(dto: CreateTechadminDto): import("./entities/techadmin.entity").Techadmin;
    findAll(): import("./entities/techadmin.entity").Techadmin[];
    findOne(id: string): import("./entities/techadmin.entity").Techadmin;
    update(id: string, dto: UpdateTechadminDto): import("./entities/techadmin.entity").Techadmin;
    remove(id: string): {
        message: string;
    };
}
