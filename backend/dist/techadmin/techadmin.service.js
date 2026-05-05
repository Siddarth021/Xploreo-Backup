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
exports.TechadminService = void 0;
const common_1 = require("@nestjs/common");
const techadmin_repository_1 = require("./techadmin.repository");
const cities_service_1 = require("../cities/cities.service");
let TechadminService = class TechadminService {
    repo;
    citiesService;
    constructor(repo, citiesService) {
        this.repo = repo;
        this.citiesService = citiesService;
    }
    create(dto) {
        this.citiesService.findOne(dto.cityId);
        return this.repo.create(dto);
    }
    findAll() { return this.repo.findAll(); }
    findOne(userId) {
        const a = this.repo.findById(userId);
        if (!a)
            throw new common_1.NotFoundException(`Techadmin ${userId} not found`);
        return a;
    }
    update(userId, dto) {
        if (dto.cityId) {
            this.citiesService.findOne(dto.cityId);
        }
        const updated = this.repo.update(userId, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Techadmin ${userId} not found`);
        return updated;
    }
    remove(userId) {
        if (!this.repo.delete(userId))
            throw new common_1.NotFoundException(`Techadmin ${userId} not found`);
        return { message: `Techadmin ${userId} deleted` };
    }
};
exports.TechadminService = TechadminService;
exports.TechadminService = TechadminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [techadmin_repository_1.TechadminRepository,
        cities_service_1.CitiesService])
], TechadminService);
//# sourceMappingURL=techadmin.service.js.map