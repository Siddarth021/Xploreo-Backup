"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const auth_entity_1 = require("./entities/auth.entity");
const uuid_1 = require("uuid");
let AuthRepository = class AuthRepository {
    credentials = [
        {
            userId: 'seed-superadmin-1',
            username: 'superadmin',
            password: 'admin123',
            role: auth_entity_1.Role.SUPERADMIN,
        },
        {
            userId: 'seed-guide-1',
            username: 'guide_ali',
            password: 'guide123',
            role: auth_entity_1.Role.GUIDE,
        },
        {
            userId: 'seed-traveller-1',
            username: 'traveller_sara',
            password: 'travel123',
            role: auth_entity_1.Role.TRAVELLER,
        },
    ];
    create(data) {
        const record = { userId: data.userId || (0, uuid_1.v4)(), ...data };
        this.credentials.push(record);
        return record;
    }
    findAll() {
        return this.credentials;
    }
    findById(userId) {
        return this.credentials.find((c) => c.userId === userId);
    }
    findByUsername(username) {
        return this.credentials.find((c) => c.username === username);
    }
    update(userId, data) {
        const idx = this.credentials.findIndex((c) => c.userId === userId);
        if (idx === -1)
            return undefined;
        this.credentials[idx] = { ...this.credentials[idx], ...data };
        return this.credentials[idx];
    }
    delete(userId) {
        const idx = this.credentials.findIndex((c) => c.userId === userId);
        if (idx === -1)
            return false;
        this.credentials.splice(idx, 1);
        return true;
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)()
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map