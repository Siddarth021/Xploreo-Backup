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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const location_repository_1 = require("./location.repository");
let LocationService = class LocationService {
    locationRepository;
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }
    create(dto) { return this.locationRepository.create(dto); }
    findAll() { return this.locationRepository.findAll(); }
    findOne(id) {
        const l = this.locationRepository.findById(id);
        if (!l)
            throw new common_1.NotFoundException(`Location ${id} not found`);
        return l;
    }
    findByCity(cityId) { return this.locationRepository.findByCity(cityId); }
    update(id, dto) {
        const updated = this.locationRepository.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Location ${id} not found`);
        return updated;
    }
    remove(id) {
        if (!this.locationRepository.delete(id))
            throw new common_1.NotFoundException(`Location ${id} not found`);
        return { message: `Location ${id} deleted` };
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [location_repository_1.LocationRepository])
], LocationService);
//# sourceMappingURL=location.service.js.map