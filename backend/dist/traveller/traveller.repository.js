"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravellerRepository = void 0;
const common_1 = require("@nestjs/common");
const traveller_entity_1 = require("./entities/traveller.entity");
let TravellerRepository = class TravellerRepository {
    travellers = [
        {
            userId: 'seed-traveller-1',
            fname: 'Sara',
            lname: 'Patel',
            email: 'sara@xploreo.com',
            phno: 9123456789,
            plang: ['English', 'Gujarati'],
            bio: 'Loves exploring local cultures and street food',
            interests: [traveller_entity_1.Interest.FOOD, traveller_entity_1.Interest.CULTURE],
        },
    ];
    create(traveller) {
        this.travellers.push(traveller);
        return traveller;
    }
    findAll() {
        return this.travellers;
    }
    findById(userId) {
        return this.travellers.find((t) => t.userId === userId);
    }
    update(userId, data) {
        const idx = this.travellers.findIndex((t) => t.userId === userId);
        if (idx === -1)
            return undefined;
        this.travellers[idx] = { ...this.travellers[idx], ...data };
        return this.travellers[idx];
    }
    delete(userId) {
        const idx = this.travellers.findIndex((t) => t.userId === userId);
        if (idx === -1)
            return false;
        this.travellers.splice(idx, 1);
        return true;
    }
};
exports.TravellerRepository = TravellerRepository;
exports.TravellerRepository = TravellerRepository = __decorate([
    (0, common_1.Injectable)()
], TravellerRepository);
//# sourceMappingURL=traveller.repository.js.map