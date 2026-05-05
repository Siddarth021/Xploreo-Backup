import { UsersService } from './users.service';
import { RegisterGuideDto, RegisterTravellerDto, RegisterSuperadminDto, RegisterTechadminDto, RegisterNontechadminDto } from './dto/create-user.dto';
import { UpdateAuthDto } from '../auth/dto/update-auth.dto';
import { Role } from '../auth/entities/auth.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): {
        userId: string;
        username: string;
        email?: string;
        role: Role;
    }[];
    registerGuide(dto: RegisterGuideDto): {
        message: string;
        userId: string;
        auth: {
            message: string;
            user: {
                userId: string;
                username: string;
                email?: string;
                role: Role;
            };
        };
        profile: import("../guide/entities/guide.entity").Guide;
    };
    registerTraveller(dto: RegisterTravellerDto): {
        message: string;
        userId: string;
        auth: {
            message: string;
            user: {
                userId: string;
                username: string;
                email?: string;
                role: Role;
            };
        };
        profile: import("../traveller/entities/traveller.entity").Traveller;
    };
    registerSuperadmin(dto: RegisterSuperadminDto): {
        message: string;
        userId: string;
        auth: {
            message: string;
            user: {
                userId: string;
                username: string;
                email?: string;
                role: Role;
            };
        };
        profile: import("../superadmin/entities/superadmin.entity").Superadmin;
    };
    registerTechadmin(dto: RegisterTechadminDto): {
        message: string;
        userId: string;
        auth: {
            message: string;
            user: {
                userId: string;
                username: string;
                email?: string;
                role: Role;
            };
        };
        profile: import("../techadmin/entities/techadmin.entity").Techadmin;
    };
    registerNontechadmin(dto: RegisterNontechadminDto): {
        message: string;
        userId: string;
        auth: {
            message: string;
            user: {
                userId: string;
                username: string;
                email?: string;
                role: Role;
            };
        };
        profile: import("../nontechadmin/entities/nontechadmin.entity").Nontechadmin;
    };
    signup(dto: RegisterTravellerDto): {
        message: string;
        userId: string;
        auth: {
            message: string;
            user: {
                userId: string;
                username: string;
                email?: string;
                role: Role;
            };
        };
        profile: import("../traveller/entities/traveller.entity").Traveller;
    };
    getFullProfile(userId: string): {
        auth: {
            userId: string;
            username: string;
            email?: string;
            role: Role;
        };
        profile: any;
    };
    findOne(id: string): {
        userId: string;
        username: string;
        email?: string;
        role: Role;
    };
    update(id: string, dto: UpdateAuthDto): {
        userId: string;
        username: string;
        email?: string;
        role: Role;
    };
    remove(id: string): {
        message: string;
    };
}
