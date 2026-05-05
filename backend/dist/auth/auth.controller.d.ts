import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Role } from './entities/auth.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): {
        message: string;
        user: {
            userId: string;
            username: string;
            role: Role;
        };
    };
    login(dto: LoginDto): {
        message: string;
        token: string;
        user: {
            userId: string;
            username: string;
            role: Role;
        };
    };
    findAll(): {
        userId: string;
        username: string;
        role: Role;
    }[];
    findOne(id: string): {
        userId: string;
        username: string;
        role: Role;
    };
    update(id: string, dto: UpdateAuthDto): {
        userId: string;
        username: string;
        role: Role;
    };
    remove(id: string): {
        message: string;
    };
}
