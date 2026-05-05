"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NontechadminRepository = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let NontechadminRepository = class NontechadminRepository {
    admins = [
        { adminId: 'seed-nontech-1', fname: 'Priya', lname: 'Nair', email: 'priya@xploreo.com', phone_number: 9123456780, location: 'Mumbai' },
    ];
    create(data) {
        const admin = { adminId: (0, uuid_1.v4)(), ...data };
        this.admins.push(admin);
        return admin;
    }
    findAll() { return this.admins; }
    findById(id) {
        return this.admins.find((a) => a.adminId === id);
    }
    update(id, data) {
        const idx = this.admins.findIndex((a) => a.adminId === id);
        if (idx === -1)
            return undefined;
        this.admins[idx] = { ...this.admins[idx], ...data };
        return this.admins[idx];
    }
    delete(id) {
        const idx = this.admins.findIndex((a) => a.adminId === id);
        if (idx === -1)
            return false;
        this.admins.splice(idx, 1);
        return true;
    }
};
exports.NontechadminRepository = NontechadminRepository;
exports.NontechadminRepository = NontechadminRepository = __decorate([
    (0, common_1.Injectable)()
], NontechadminRepository);
//# sourceMappingURL=nontechadmin.repository.js.map