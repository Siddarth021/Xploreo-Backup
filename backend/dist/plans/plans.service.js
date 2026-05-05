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
exports.PlansService = void 0;
const common_1 = require("@nestjs/common");
const plans_repository_1 = require("./plans.repository");
const location_service_1 = require("../location/location.service");
let PlansService = class PlansService {
    plansRepository;
    locationService;
    constructor(plansRepository, locationService) {
        this.plansRepository = plansRepository;
        this.locationService = locationService;
    }
    create(dto) {
        dto.location.forEach(locId => this.locationService.findOne(locId));
        return this.plansRepository.create(dto);
    }
    findAll(query) {
        return this.plansRepository.findAll({
            page: query.page ? Number(query.page) : 1,
            limit: query.limit ? Number(query.limit) : 10,
            category: query.category,
            destination: query.destination,
            availability: query.availability,
        });
    }
    findOne(id) {
        const plan = this.plansRepository.findById(id);
        if (!plan)
            throw new common_1.NotFoundException(`Plan ${id} not found`);
        return plan;
    }
    update(id, dto) {
        const updated = this.plansRepository.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Plan ${id} not found`);
        return updated;
    }
    remove(id) {
        const deleted = this.plansRepository.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Plan ${id} not found`);
        return { message: `Plan ${id} deleted` };
    }
};
exports.PlansService = PlansService;
exports.PlansService = PlansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [plans_repository_1.PlansRepository,
        location_service_1.LocationService])
], PlansService);
//# sourceMappingURL=plans.service.js.map