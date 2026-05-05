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
exports.ExperiencesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const experiences_service_1 = require("./experiences.service");
const create_experience_dto_1 = require("./dto/create-experience.dto");
const update_experience_dto_1 = require("./dto/update-experience.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const auth_entity_1 = require("../auth/entities/auth.entity");
let ExperiencesController = class ExperiencesController {
    experiencesService;
    constructor(experiencesService) {
        this.experiencesService = experiencesService;
    }
    create(dto) {
        return this.experiencesService.create(dto);
    }
    findAll() {
        return this.experiencesService.findAll();
    }
    findByLocation(locationId) {
        return this.experiencesService.findByLocation(locationId);
    }
    findOne(id) {
        return this.experiencesService.findOne(id);
    }
    update(id, dto) {
        return this.experiencesService.update(id, dto);
    }
    remove(id) {
        return this.experiencesService.remove(id);
    }
};
exports.ExperiencesController = ExperiencesController;
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN, auth_entity_1.Role.NONTECHADMIN, auth_entity_1.Role.EXPERIENCES),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create an experience' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_experience_dto_1.CreateExperienceDto]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all experiences' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('location/:locationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get experiences by location' }),
    __param(0, (0, common_1.Param)('locationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "findByLocation", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get experience by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN, auth_entity_1.Role.NONTECHADMIN, auth_entity_1.Role.EXPERIENCES),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an experience' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_experience_dto_1.UpdateExperienceDto]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an experience' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "remove", null);
exports.ExperiencesController = ExperiencesController = __decorate([
    (0, swagger_1.ApiTags)('Experiences'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('experiences'),
    __metadata("design:paramtypes", [experiences_service_1.ExperiencesService])
], ExperiencesController);
//# sourceMappingURL=experiences.controller.js.map