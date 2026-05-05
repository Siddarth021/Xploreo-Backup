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
exports.SuperadminService = void 0;
const common_1 = require("@nestjs/common");
const superadmin_repository_1 = require("./superadmin.repository");
let SuperadminService = class SuperadminService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) { return this.repo.create(dto); }
    findAll() { return this.repo.findAll(); }
    findOne(userId) {
        const a = this.repo.findById(userId);
        if (!a)
            throw new common_1.NotFoundException(`Superadmin ${userId} not found`);
        return a;
    }
    update(userId, dto) {
        const updated = this.repo.update(userId, dto);
        if (!updated)
            throw new common_1.NotFoundException(`Superadmin ${userId} not found`);
        return updated;
    }
    remove(userId) {
        if (!this.repo.delete(userId))
            throw new common_1.NotFoundException(`Superadmin ${userId} not found`);
        return { message: `Superadmin ${userId} deleted` };
    }
};
exports.SuperadminService = SuperadminService;
exports.SuperadminService = SuperadminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [superadmin_repository_1.SuperadminRepository])
], SuperadminService);
//# sourceMappingURL=superadmin.service.js.map