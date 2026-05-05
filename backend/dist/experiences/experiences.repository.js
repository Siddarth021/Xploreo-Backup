"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperiencesRepository = void 0;
const common_1 = require("@nestjs/common");
const experience_entity_1 = require("./entities/experience.entity");
const uuid_1 = require("uuid");
let ExperiencesRepository = class ExperiencesRepository {
    experiences = [
        {
            experienceId: 'seed-exp-1',
            ownerUserId: 'seed-exp-owner-1',
            title: 'Sunrise Trek to Tiger Hill',
            description: 'A 4-hour guided trek to Tiger Hill with panoramic views',
            price: 1500,
            durationHours: 4,
            providerId: 'seed-provider-1',
            locationId: 'loc-darjeeling-1',
            category: experience_entity_1.ExperienceCategory.ADVENTURE,
            availability: experience_entity_1.ExperienceAvailability.AVAILABLE,
            maxParticipants: 15,
        },
    ];
    create(data) {
        const exp = { experienceId: (0, uuid_1.v4)(), ...data };
        this.experiences.push(exp);
        return exp;
    }
    findByOwnerUserId(ownerUserId) {
        return this.experiences.filter((e) => e.ownerUserId === ownerUserId);
    }
    findAll() {
        return this.experiences;
    }
    findById(id) {
        return this.experiences.find((e) => e.experienceId === id);
    }
    findByLocation(locationId) {
        return this.experiences.filter((e) => e.locationId === locationId);
    }
    findByCategory(category) {
        return this.experiences.filter((e) => e.category === category);
    }
    update(id, data) {
        const idx = this.experiences.findIndex((e) => e.experienceId === id);
        if (idx === -1)
            return undefined;
        this.experiences[idx] = { ...this.experiences[idx], ...data };
        return this.experiences[idx];
    }
    delete(id) {
        const idx = this.experiences.findIndex((e) => e.experienceId === id);
        if (idx === -1)
            return false;
        this.experiences.splice(idx, 1);
        return true;
    }
};
exports.ExperiencesRepository = ExperiencesRepository;
exports.ExperiencesRepository = ExperiencesRepository = __decorate([
    (0, common_1.Injectable)()
], ExperiencesRepository);
//# sourceMappingURL=experiences.repository.js.map