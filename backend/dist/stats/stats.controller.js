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
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stats_service_1 = require("./stats.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const auth_entity_1 = require("../auth/entities/auth.entity");
let StatsController = class StatsController {
    statsService;
    constructor(statsService) {
        this.statsService = statsService;
    }
    getDashboardStats() {
        return this.statsService.getAdminDashboardStats();
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, roles_decorator_1.Roles)(auth_entity_1.Role.SUPERADMIN, auth_entity_1.Role.NONTECHADMIN, auth_entity_1.Role.TECHADMIN),
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get aggregated stats for the admin dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getDashboardStats", null);
exports.StatsController = StatsController = __decorate([
    (0, swagger_1.ApiTags)('Stats'),
    (0, swagger_1.ApiHeader)({ name: 'x-user-id', required: true }),
    (0, swagger_1.ApiHeader)({ name: 'x-user-role', required: true }),
    (0, common_1.Controller)('stats'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
//# sourceMappingURL=stats.controller.js.map