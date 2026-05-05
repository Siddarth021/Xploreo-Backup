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
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const hotels_repository_1 = require("./hotels.repository");
let HotelsService = class HotelsService {
    hotelsRepository;
    constructor(hotelsRepository) {
        this.hotelsRepository = hotelsRepository;
    }
    create(dto) {
        return this.hotelsRepository.create({
            ownerUserId: dto.ownerUserId || '',
            hotel_name: dto.hotel_name,
            location: dto.location,
            description: dto.description,
            contact_number: dto.contact_number,
            email: dto.email,
            tax_id: dto.tax_id ?? '',
            bank_account_number: dto.bank_account_number ?? '',
            check_in_time: dto.check_in_time,
            check_out_time: dto.check_out_time,
            cancellation_policy: dto.cancellation_policy ?? '',
        });
    }
    findAll() {
        return this.hotelsRepository.findAll();
    }
    findOne(id) {
        const hotel = this.hotelsRepository.findById(id);
        if (!hotel)
            throw new common_1.NotFoundException(`Hotel ${id} not found`);
        return hotel;
    }
    findByLocation(locationId) {
        return this.hotelsRepository.findByLocation(locationId);
    }
    update(id, dto) {
        const updated = this.hotelsRepository.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Hotel ${id} not found`);
        return updated;
    }
    remove(id) {
        const deleted = this.hotelsRepository.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Hotel ${id} not found`);
        return { message: `Hotel ${id} deleted` };
    }
};
exports.HotelsService = HotelsService;
exports.HotelsService = HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hotels_repository_1.HotelsRepository])
], HotelsService);
//# sourceMappingURL=hotels.service.js.map