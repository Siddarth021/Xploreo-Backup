import { AuthService } from '../auth/auth.service';
import { GuideService } from '../guide/guide.service';
import { TravellerService } from '../traveller/traveller.service';
import { SuperadminService } from '../superadmin/superadmin.service';
import { TechadminService } from '../techadmin/techadmin.service';
import { NontechadminService } from '../nontechadmin/nontechadmin.service';
import { RegisterGuideDto, RegisterTravellerDto, RegisterSuperadminDto, RegisterTechadminDto, RegisterNontechadminDto } from './dto/create-user.dto';
import { Role } from '../auth/entities/auth.entity';
import { UpdateAuthDto } from '../auth/dto/update-auth.dto';
export declare class UsersService {
    private readonly authService;
    private readonly guideService;
    private readonly travellerService;
    private readonly superadminService;
    private readonly techadminService;
    private readonly nontechadminService;
    constructor(authService: AuthService, guideService: GuideService, travellerService: TravellerService, superadminService: SuperadminService, techadminService: TechadminService, nontechadminService: NontechadminService);
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
    findAll(): {
        userId: string;
        username: string;
        email?: string;
        role: Role;
    }[];
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
    getFullProfile(userId: string): {
        auth: {
            userId: string;
            username: string;
            email?: string;
            role: Role;
        };
        profile: any;
    };
}
