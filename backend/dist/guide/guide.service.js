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
exports.GuideService = void 0;
const common_1 = require("@nestjs/common");
const guide_repository_1 = require("./guide.repository");
let GuideService = class GuideService {
    guideRepository;
    constructor(guideRepository) {
        this.guideRepository = guideRepository;
    }
    create(dto) {
        return this.guideRepository.create({
            userId: dto.userId,
            fname: dto.fname,
            lname: dto.lname,
            email: dto.email,
            phone: dto.phone,
            location: dto.location,
            prof_title: dto.prof_title,
            years_exp: dto.years_exp,
            bio: dto.bio,
            lang_spoken: dto.lang_spoken,
            certifications: dto.certifications ?? [],
            bank_name: dto.bank_name ?? '',
            bank_acc_num_end: dto.bank_acc_num_end ?? 0,
            iban: dto.iban ?? '',
        });
    }
    findAll() {
        return this.guideRepository.findAll();
    }
    findOne(id) {
        const guide = this.guideRepository.findById(id);
        if (!guide)
            throw new common_1.NotFoundException(`Guide ${id} not found`);
        return guide;
    }
    findByLocation(locationId) {
        return this.guideRepository.findByLocation(locationId);
    }
    update(id, dto) {
        const updated = this.guideRepository.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Guide ${id} not found`);
        return updated;
    }
    remove(id) {
        const deleted = this.guideRepository.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Guide ${id} not found`);
        return { message: `Guide ${id} deleted` };
    }
};
exports.GuideService = GuideService;
exports.GuideService = GuideService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [guide_repository_1.GuideRepository])
], GuideService);
//# sourceMappingURL=guide.service.js.map