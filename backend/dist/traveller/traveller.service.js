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
exports.TravellerService = void 0;
const common_1 = require("@nestjs/common");
const traveller_repository_1 = require("./traveller.repository");
let TravellerService = class TravellerService {
    travellerRepository;
    constructor(travellerRepository) {
        this.travellerRepository = travellerRepository;
    }
    create(dto) {
        return this.travellerRepository.create({
            userId: dto.userId,
            fname: dto.fname,
            lname: dto.lname,
            email: dto.email,
            phno: dto.phno,
            plang: dto.plang ?? [],
            bio: dto.bio ?? '',
            interests: dto.interests ?? [],
        });
    }
    findAll() {
        return this.travellerRepository.findAll();
    }
    findOne(id) {
        const t = this.travellerRepository.findById(id);
        if (!t)
            throw new common_1.NotFoundException(`Traveller ${id} not found`);
        return t;
    }
    update(id, dto) {
        const updated = this.travellerRepository.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Traveller ${id} not found`);
        return updated;
    }
    remove(id) {
        const deleted = this.travellerRepository.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Traveller ${id} not found`);
        return { message: `Traveller ${id} deleted` };
    }
};
exports.TravellerService = TravellerService;
exports.TravellerService = TravellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [traveller_repository_1.TravellerRepository])
], TravellerService);
//# sourceMappingURL=traveller.service.js.map