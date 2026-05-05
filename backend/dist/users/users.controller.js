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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_auth_dto_1 = require("../auth/dto/update-auth.dto");
const public_decorator_1 = require("../common/decorators/public.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const auth_entity_1 = require("../auth/entities/auth.entity");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll() {
        return this.usersService.findAll();
    }
    registerGuide(dto) {
        return this.usersService.registerGuide(dto);
    }
    registerTraveller(dto) {
        return this.usersService.registerTraveller(dto);
    }
    registerSuperadmin(dto) {
        return this.usersService.registerSuperadmin(dto);
    }
    registerTechadmin(dto) {
        return this.usersService.registerTechadmin(dto);
    }
    registerNontechadmin(dto) {
        return this.usersService.registerNontechadmin(dto);
    }
    signup(dto) {
        return this.usersService.registerTraveller(dto);
    }
    getFullProfile(userId) {
        return this.usersService.getFullProfile(userId);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, dto) {
        return this.usersService.update(id, dto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register/guide'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new Guide' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.RegisterGuideDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "registerGuide", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register/traveller'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new Traveller' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.RegisterTravellerDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "registerTraveller", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register/superadmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new Superadmin' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.RegisterSuperadminDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "registerSuperadmin", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register/techadmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new Techadmin' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.RegisterTechadminDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "registerTechadmin", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register/nontechadmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new Nontechadmin' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.RegisterNontechadminDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "registerNontechadmin", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Signup alias for traveller registration' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.RegisterTravellerDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('profile/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get combined Auth & Profile by User ID' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getFullProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user auth record' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_auth_dto_1.UpdateAuthDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user auth record' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users (Orchestrator)'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map