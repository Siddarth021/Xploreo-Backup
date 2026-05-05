import { SuperadminRepository } from './superadmin.repository';
import { CreateSuperadminDto } from './dto/create-superadmin.dto';
import { UpdateSuperadminDto } from './dto/update-superadmin.dto';
export declare class SuperadminService {
    private readonly repo;
    constructor(repo: SuperadminRepository);
    create(dto: CreateSuperadminDto): import("./entities/superadmin.entity").Superadmin;
    findAll(): import("./entities/superadmin.entity").Superadmin[];
    findOne(id: string): import("./entities/superadmin.entity").Superadmin;
    update(id: string, dto: UpdateSuperadminDto): import("./entities/superadmin.entity").Superadmin;
    remove(id: string): {
        message: string;
    };
}
