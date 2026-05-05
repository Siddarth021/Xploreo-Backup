"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("./auth.repository");
const auth_entity_1 = require("./entities/auth.entity");
const jwt_service_1 = require("./jwt.service");
let AuthService = class AuthService {
    authRepository;
    jwtService;
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    register(dto) {
        const existing = this.authRepository.findByUsername(dto.username);
        if (existing)
            throw new common_1.ConflictException('Username already exists');
        const user = this.authRepository.create({
            userId: dto.userId,
            username: dto.username,
            email: dto.email,
            password: dto.password,
            role: dto.role ?? auth_entity_1.Role.TRAVELLER,
        });
        const { password: _pw, ...safe } = user;
        return { message: 'Registered successfully', user: safe };
    }
    login(dto) {
        const user = this.authRepository.findByUsername(dto.username);
        if (!user || user.password !== dto.password) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const token = this.jwtService.sign({
            sub: user.userId,
            username: user.username,
            role: user.role,
        });
        const { password: _pw, ...safe } = user;
        return {
            message: 'Login successful',
            token,
            user: safe,
        };
    }
    findAll() {
        return this.authRepository.findAll().map(({ password: _pw, ...u }) => u);
    }
    findOne(id) {
        const user = this.authRepository.findById(id);
        if (!user)
            throw new common_1.NotFoundException(`User ${id} not found`);
        const { password: _pw, ...safe } = user;
        return safe;
    }
    update(id, dto) {
        const updated = this.authRepository.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`User ${id} not found`);
        const { password: _pw, ...safe } = updated;
        return safe;
    }
    remove(id) {
        const deleted = this.authRepository.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException(`User ${id} not found`);
        return { message: `User ${id} deleted` };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_service_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map