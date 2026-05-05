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
exports.TravellerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const traveller_service_1 = require("./traveller.service");
const create_traveller_dto_1 = require("./dto/create-traveller.dto");
const update_traveller_dto_1 = require("./dto/update-traveller.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const auth_entity_1 = require("../auth/entities/auth.entity");
let TravellerController = class TravellerController {
    travellerService;
    constructor(travellerService) {
        this.travellerService = travellerService;
    }
    create(req, dto) {
        const userId = req.user.userId;
        return this.travellerService.create(userId, dto);
    }
    findAll() {
        return this.travellerService.findAll();
    }
    findOne(id) {
        return this.travellerService.findOne(id);
    }
    update(id, dto) {
        return this.travellerService.update(id, dto);
    }
    remove(id) {
        return this.travellerService.remove(id);
    }
};
exports.TravellerController = TravellerController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a traveller profile' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_traveller_dto_1.CreateTravellerDto]),
    __metadata("design:returntype", void 0)
], TravellerController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN, auth_entity_1.Role.NONTECHADMIN),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all travellers (admin only)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TravellerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get traveller by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TravellerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update traveller profile' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_traveller_dto_1.UpdateTravellerDto]),
    __metadata("design:returntype", void 0)
], TravellerController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a traveller (SuperAdmin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TravellerController.prototype, "remove", null);
exports.TravellerController = TravellerController = __decorate([
    (0, swagger_1.ApiTags)('Traveller'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('traveller'),
    __metadata("design:paramtypes", [traveller_service_1.TravellerService])
], TravellerController);
//# sourceMappingURL=traveller.controller.js.map