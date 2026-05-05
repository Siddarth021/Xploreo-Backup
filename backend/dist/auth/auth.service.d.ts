import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
export declare class AuthService {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    register(dto: RegisterDto): {
        message: string;
        user: {
            userId: string;
            username: string;
            role: import("./entities/auth.entity").Role;
        };
    };
    login(dto: LoginDto): {
        message: string;
        token: string;
        user: {
            userId: string;
            username: string;
            role: import("./entities/auth.entity").Role;
        };
    };
    findAll(): {
        userId: string;
        username: string;
        role: import("./entities/auth.entity").Role;
    }[];
    findOne(id: string): {
        userId: string;
        username: string;
        role: import("./entities/auth.entity").Role;
    };
    update(id: string, dto: UpdateAuthDto): {
        userId: string;
        username: string;
        role: import("./entities/auth.entity").Role;
    };
    remove(id: string): {
        message: string;
    };
}
