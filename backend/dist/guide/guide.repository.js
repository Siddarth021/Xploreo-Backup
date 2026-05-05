"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideRepository = void 0;
const common_1 = require("@nestjs/common");
let GuideRepository = class GuideRepository {
    guides = [
        {
            userId: 'seed-guide-1',
            fname: 'Ali',
            lname: 'Khan',
            email: 'ali@xploreo.com',
            phone: 9876543210,
            location: 'loc-mumbai-1',
            prof_title: 'Senior Trek Guide',
            years_exp: 7,
            bio: 'Expert mountain guide with 7+ years experience in Western Ghats',
            lang_spoken: ['English', 'Hindi', 'Marathi'],
            certifications: ['First Aid', 'Mountain Rescue'],
            bank_name: 'HDFC Bank',
            bank_acc_num_end: 1234,
            iban: 'IN123456789012345678',
        },
    ];
    create(guide) {
        this.guides.push(guide);
        return guide;
    }
    findAll() {
        return this.guides;
    }
    findById(userId) {
        return this.guides.find((g) => g.userId === userId);
    }
    findByLocation(locationId) {
        return this.guides.filter((g) => g.location === locationId);
    }
    update(userId, data) {
        const idx = this.guides.findIndex((g) => g.userId === userId);
        if (idx === -1)
            return undefined;
        this.guides[idx] = { ...this.guides[idx], ...data };
        return this.guides[idx];
    }
    delete(userId) {
        const idx = this.guides.findIndex((g) => g.userId === userId);
        if (idx === -1)
            return false;
        this.guides.splice(idx, 1);
        return true;
    }
};
exports.GuideRepository = GuideRepository;
exports.GuideRepository = GuideRepository = __decorate([
    (0, common_1.Injectable)()
], GuideRepository);
//# sourceMappingURL=guide.repository.js.map