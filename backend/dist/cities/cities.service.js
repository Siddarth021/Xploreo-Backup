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
exports.CitiesService = void 0;
const common_1 = require("@nestjs/common");
const cities_repository_1 = require("./cities.repository");
let CitiesService = class CitiesService {
    citiesRepository;
    constructor(citiesRepository) {
        this.citiesRepository = citiesRepository;
    }
    create(dto) { return this.citiesRepository.create(dto); }
    findAll() { return this.citiesRepository.findAll(); }
    findOne(id) {
        const c = this.citiesRepository.findById(id);
        if (!c)
            throw new common_1.NotFoundException(`City ${id} not found`);
        return c;
    }
    update(id, dto) {
        const updated = this.citiesRepository.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`City ${id} not found`);
        return updated;
    }
    remove(id) {
        if (!this.citiesRepository.delete(id))
            throw new common_1.NotFoundException(`City ${id} not found`);
        return { message: `City ${id} deleted` };
    }
};
exports.CitiesService = CitiesService;
exports.CitiesService = CitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cities_repository_1.CitiesRepository])
], CitiesService);
//# sourceMappingURL=cities.service.js.map