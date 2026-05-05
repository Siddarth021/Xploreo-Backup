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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const trips_repository_1 = require("./trips.repository");
let TripsService = class TripsService {
    tripsRepository;
    constructor(tripsRepository) {
        this.tripsRepository = tripsRepository;
    }
    create(dto) {
        return this.tripsRepository.create(dto);
    }
    findAll() {
        return this.tripsRepository.findAll();
    }
    findOne(id) {
        const trip = this.tripsRepository.findById(id);
        if (!trip)
            throw new common_1.NotFoundException(`Trip ${id} not found`);
        return trip;
    }
    findByTraveller(travellerId) {
        return this.tripsRepository.findByTraveller(travellerId);
    }
    findByGuide(guideId) {
        return this.tripsRepository.findByGuide(guideId);
    }
    update(id, dto) {
        const updated = this.tripsRepository.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Trip ${id} not found`);
        return updated;
    }
    remove(id) {
        const deleted = this.tripsRepository.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Trip ${id} not found`);
        return { message: `Trip ${id} deleted` };
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [trips_repository_1.TripsRepository])
], TripsService);
//# sourceMappingURL=trips.service.js.map