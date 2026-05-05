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
exports.NontechadminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nontechadmin_service_1 = require("./nontechadmin.service");
const create_nontechadmin_dto_1 = require("./dto/create-nontechadmin.dto");
const update_nontechadmin_dto_1 = require("./dto/update-nontechadmin.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const auth_entity_1 = require("../auth/entities/auth.entity");
let NontechadminController = class NontechadminController {
    nontechadminService;
    constructor(nontechadminService) {
        this.nontechadminService = nontechadminService;
    }
    create(dto) { return this.nontechadminService.create(dto); }
    findAll() { return this.nontechadminService.findAll(); }
    findOne(id) { return this.nontechadminService.findOne(id); }
    update(id, dto) { return this.nontechadminService.update(id, dto); }
    remove(id) { return this.nontechadminService.remove(id); }
};
exports.NontechadminController = NontechadminController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a non-tech admin' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nontechadmin_dto_1.CreateNontechadminDto]),
    __metadata("design:returntype", void 0)
], NontechadminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all non-tech admins' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NontechadminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get non-tech admin by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NontechadminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a non-tech admin' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_nontechadmin_dto_1.UpdateNontechadminDto]),
    __metadata("design:returntype", void 0)
], NontechadminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a non-tech admin' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NontechadminController.prototype, "remove", null);
exports.NontechadminController = NontechadminController = __decorate([
    (0, swagger_1.ApiTags)('Nontechadmin'),
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('nontechadmin'),
    __metadata("design:paramtypes", [nontechadmin_service_1.NontechadminService])
], NontechadminController);
//# sourceMappingURL=nontechadmin.controller.js.map