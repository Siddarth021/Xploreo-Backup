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
exports.GuideController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guide_service_1 = require("./guide.service");
const create_guide_dto_1 = require("./dto/create-guide.dto");
const update_guide_dto_1 = require("./dto/update-guide.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const auth_entity_1 = require("../auth/entities/auth.entity");
let GuideController = class GuideController {
    guideService;
    constructor(guideService) {
        this.guideService = guideService;
    }
    create(req, dto) {
        const userId = req.user.userId;
        return this.guideService.create(userId, dto);
    }
    findAll() {
        return this.guideService.findAll();
    }
    findByLocation(locationId) {
        return this.guideService.findByLocation(locationId);
    }
    findOne(id) {
        return this.guideService.findOne(id);
    }
    update(id, dto) {
        return this.guideService.update(id, dto);
    }
    remove(id) {
        return this.guideService.remove(id);
    }
};
exports.GuideController = GuideController;
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN, auth_entity_1.Role.NONTECHADMIN),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a guide profile' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_guide_dto_1.CreateGuideDto]),
    __metadata("design:returntype", void 0)
], GuideController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all guides' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GuideController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('location/:locationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guides by location' }),
    __param(0, (0, common_1.Param)('locationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuideController.prototype, "findByLocation", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guide by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuideController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN, auth_entity_1.Role.NONTECHADMIN, auth_entity_1.Role.GUIDE),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a guide profile' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_guide_dto_1.UpdateGuideDto]),
    __metadata("design:returntype", void 0)
], GuideController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a guide' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuideController.prototype, "remove", null);
exports.GuideController = GuideController = __decorate([
    (0, swagger_1.ApiTags)('Guide'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('guide'),
    __metadata("design:paramtypes", [guide_service_1.GuideService])
], GuideController);
//# sourceMappingURL=guide.controller.js.map