"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsRepository = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let HotelsRepository = class HotelsRepository {
    hotels = [
        {
            hotelId: 'seed-hotel-1',
            hotel_name: 'The Grand Xploreo',
            location: 'loc-goa-beach-1',
            description: 'Luxury beachfront hotel with full amenities',
            contact_number: 8321456789,
            email: 'hotel@grandxploreo.com',
            tax_id: 'TAX-GJ-12345',
            bank_account_number: '****1234',
            check_in_time: '14:00',
            check_out_time: '11:00',
            cancellation_policy: 'Free cancellation within 24 hours',
        },
    ];
    create(data) {
        const hotel = { hotelId: (0, uuid_1.v4)(), ...data };
        this.hotels.push(hotel);
        return hotel;
    }
    findAll() {
        return this.hotels;
    }
    findById(hotelId) {
        return this.hotels.find((h) => h.hotelId === hotelId);
    }
    findByLocation(locationId) {
        return this.hotels.filter((h) => h.location === locationId);
    }
    update(hotelId, data) {
        const idx = this.hotels.findIndex((h) => h.hotelId === hotelId);
        if (idx === -1)
            return undefined;
        this.hotels[idx] = { ...this.hotels[idx], ...data };
        return this.hotels[idx];
    }
    delete(hotelId) {
        const idx = this.hotels.findIndex((h) => h.hotelId === hotelId);
        if (idx === -1)
            return false;
        this.hotels.splice(idx, 1);
        return true;
    }
};
exports.HotelsRepository = HotelsRepository;
exports.HotelsRepository = HotelsRepository = __decorate([
    (0, common_1.Injectable)()
], HotelsRepository);
//# sourceMappingURL=hotels.repository.js.map