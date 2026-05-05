import { SuperadminService } from './superadmin.service';
import { CreateSuperadminDto } from './dto/create-superadmin.dto';
import { UpdateSuperadminDto } from './dto/update-superadmin.dto';
export declare class SuperadminController {
    private readonly superadminService;
    constructor(superadminService: SuperadminService);
    create(dto: CreateSuperadminDto): import("./entities/superadmin.entity").Superadmin;
    findAll(): import("./entities/superadmin.entity").Superadmin[];
    findOne(userId: string): import("./entities/superadmin.entity").Superadmin;
    update(userId: string, dto: UpdateSuperadminDto): import("./entities/superadmin.entity").Superadmin;
    remove(userId: string): {
        message: string;
    };
}
