import { NontechadminService } from './nontechadmin.service';
import { CreateNontechadminDto } from './dto/create-nontechadmin.dto';
import { UpdateNontechadminDto } from './dto/update-nontechadmin.dto';
export declare class NontechadminController {
    private readonly nontechadminService;
    constructor(nontechadminService: NontechadminService);
    create(dto: CreateNontechadminDto): import("./entities/nontechadmin.entity").Nontechadmin;
    findAll(): import("./entities/nontechadmin.entity").Nontechadmin[];
    findOne(id: string): import("./entities/nontechadmin.entity").Nontechadmin;
    update(id: string, dto: UpdateNontechadminDto): import("./entities/nontechadmin.entity").Nontechadmin;
    remove(id: string): {
        message: string;
    };
}
