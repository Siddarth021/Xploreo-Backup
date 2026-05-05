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
exports.HotelsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hotels_service_1 = require("./hotels.service");
const create_hotel_dto_1 = require("./dto/create-hotel.dto");
const update_hotel_dto_1 = require("./dto/update-hotel.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const auth_entity_1 = require("../auth/entities/auth.entity");
let HotelsController = class HotelsController {
    hotelsService;
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
    }
    create(dto) {
        return this.hotelsService.create(dto);
    }
    findAll() {
        return this.hotelsService.findAll();
    }
    findByLocation(locationId) {
        return this.hotelsService.findByLocation(locationId);
    }
    findOne(id) {
        return this.hotelsService.findOne(id);
    }
    update(id, dto) {
        return this.hotelsService.update(id, dto);
    }
    remove(id) {
        return this.hotelsService.remove(id);
    }
};
exports.HotelsController = HotelsController;
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN, auth_entity_1.Role.NONTECHADMIN, auth_entity_1.Role.HOTEL),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register a hotel' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hotel_dto_1.CreateHotelDto]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all hotels' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('location/:locationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get hotels by location' }),
    __param(0, (0, common_1.Param)('locationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "findByLocation", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get hotel by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN, auth_entity_1.Role.NONTECHADMIN, auth_entity_1.Role.HOTEL),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update hotel details' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hotel_dto_1.UpdateHotelDto]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a hotel (SuperAdmin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "remove", null);
exports.HotelsController = HotelsController = __decorate([
    (0, swagger_1.ApiTags)('Hotels'),
    (0, swagger_1.ApiHeader)({ name: 'x-user-id', required: true }),
    (0, swagger_1.ApiHeader)({ name: 'x-user-role', required: true }),
    (0, common_1.Controller)('hotels'),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService])
], HotelsController);
//# sourceMappingURL=hotels.controller.js.map