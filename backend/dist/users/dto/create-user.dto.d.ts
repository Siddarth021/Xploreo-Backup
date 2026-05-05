import { RegisterDto } from '../../auth/dto/create-auth.dto';
import { CreateGuideDto } from '../../guide/dto/create-guide.dto';
import { CreateTravellerDto } from '../../traveller/dto/create-traveller.dto';
import { CreateSuperadminDto } from '../../superadmin/dto/create-superadmin.dto';
import { CreateTechadminDto } from '../../techadmin/dto/create-techadmin.dto';
import { CreateNontechadminDto } from '../../nontechadmin/dto/create-nontechadmin.dto';
export declare enum UserRole {
    GUIDE = "guide",
    TRAVELLER = "traveller",
    SUPERADMIN = "superadmin",
    TECHADMIN = "techadmin",
    NONTECHADMIN = "nontechadmin"
}
export declare class RegisterGuideDto {
    authData: RegisterDto;
    profileData: CreateGuideDto;
}
export declare class RegisterTravellerDto {
    authData: RegisterDto;
    profileData: CreateTravellerDto;
}
export declare class RegisterSuperadminDto {
    authData: RegisterDto;
    profileData: CreateSuperadminDto;
}
export declare class RegisterTechadminDto {
    authData: RegisterDto;
    profileData: CreateTechadminDto;
}
export declare class RegisterNontechadminDto {
    authData: RegisterDto;
    profileData: CreateNontechadminDto;
}
export declare class CreateUserDto {
    role: UserRole;
    authData: RegisterDto;
    profileData: CreateGuideDto | CreateTravellerDto | CreateSuperadminDto | CreateTechadminDto | CreateNontechadminDto;
}
