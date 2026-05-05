"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt = __importStar(require("jsonwebtoken"));
const auth_repository_1 = require("./auth.repository");
let AuthService = class AuthService {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    register(dto) {
        const existing = this.authRepository.findByUsername(dto.username);
        if (existing)
            throw new common_1.ConflictException('Username already exists');
        const user = this.authRepository.create({
            username: dto.username,
            password: dto.password,
            role: dto.role,
        });
        const { password: _pw, ...safe } = user;
        return { message: 'Registered successfully', user: safe };
    }
    login(dto) {
        const user = this.authRepository.findByUsername(dto.username);
        if (!user || user.password !== dto.password) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        const payload = { userId: user.userId, role: user.role };
        const token = jwt.sign(payload, 'XPLOREO_SECRET_KEY', { expiresIn: '1h' });
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
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map