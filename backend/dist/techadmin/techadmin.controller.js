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
exports.TechadminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const techadmin_service_1 = require("./techadmin.service");
const create_techadmin_dto_1 = require("./dto/create-techadmin.dto");
const update_techadmin_dto_1 = require("./dto/update-techadmin.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const auth_entity_1 = require("../auth/entities/auth.entity");
let TechadminController = class TechadminController {
    techadminService;
    constructor(techadminService) {
        this.techadminService = techadminService;
    }
    create(dto) { return this.techadminService.create(dto); }
    findAll() { return this.techadminService.findAll(); }
    findOne(userId) { return this.techadminService.findOne(userId); }
    update(userId, dto) { return this.techadminService.update(userId, dto); }
    remove(userId) { return this.techadminService.remove(userId); }
};
exports.TechadminController = TechadminController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a tech admin' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_techadmin_dto_1.CreateTechadminDto]),
    __metadata("design:returntype", void 0)
], TechadminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all tech admins' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TechadminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tech admin by ID' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechadminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a tech admin' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_techadmin_dto_1.UpdateTechadminDto]),
    __metadata("design:returntype", void 0)
], TechadminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a tech admin' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TechadminController.prototype, "remove", null);
exports.TechadminController = TechadminController = __decorate([
    (0, swagger_1.ApiTags)('Techadmin'),
    (0, swagger_1.ApiHeader)({ name: 'x-user-id', required: true }),
    (0, swagger_1.ApiHeader)({ name: 'x-user-role', required: true }),
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN),
    (0, common_1.Controller)('techadmin'),
    __metadata("design:paramtypes", [techadmin_service_1.TechadminService])
], TechadminController);
//# sourceMappingURL=techadmin.controller.js.map