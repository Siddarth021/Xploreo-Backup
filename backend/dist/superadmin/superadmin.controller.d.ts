import { SuperadminService } from './superadmin.service';
import { CreateSuperadminDto } from './dto/create-superadmin.dto';
import { UpdateSuperadminDto } from './dto/update-superadmin.dto';
export declare class SuperadminController {
    private readonly superadminService;
    constructor(superadminService: SuperadminService);
    create(dto: CreateSuperadminDto): import("./entities/superadmin.entity").Superadmin;
    findAll(): import("./entities/superadmin.entity").Superadmin[];
    findOne(id: string): import("./entities/superadmin.entity").Superadmin;
    update(id: string, dto: UpdateSuperadminDto): import("./entities/superadmin.entity").Superadmin;
    remove(id: string): {
        message: string;
    };
}
