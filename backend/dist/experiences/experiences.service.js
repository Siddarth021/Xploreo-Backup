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
exports.ExperiencesService = void 0;
const common_1 = require("@nestjs/common");
const experiences_repository_1 = require("./experiences.repository");
let ExperiencesService = class ExperiencesService {
    expRepository;
    constructor(expRepository) {
        this.expRepository = expRepository;
    }
    create(dto) {
        return this.expRepository.create(dto);
    }
    findAll() {
        return this.expRepository.findAll();
    }
    findOne(id) {
        const exp = this.expRepository.findById(id);
        if (!exp)
            throw new common_1.NotFoundException(`Experience ${id} not found`);
        return exp;
    }
    findByLocation(locationId) {
        return this.expRepository.findByLocation(locationId);
    }
    update(id, dto) {
        const updated = this.expRepository.update(id, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Experience ${id} not found`);
        return updated;
    }
    remove(id) {
        const deleted = this.expRepository.delete(id);
        if (!deleted)
            throw new common_1.NotFoundException(`Experience ${id} not found`);
        return { message: `Experience ${id} deleted` };
    }
};
exports.ExperiencesService = ExperiencesService;
exports.ExperiencesService = ExperiencesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [experiences_repository_1.ExperiencesRepository])
], ExperiencesService);
//# sourceMappingURL=experiences.service.js.map