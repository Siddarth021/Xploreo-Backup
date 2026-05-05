"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsRepository = void 0;
const common_1 = require("@nestjs/common");
const trip_entity_1 = require("./entities/trip.entity");
const uuid_1 = require("uuid");
let TripsRepository = class TripsRepository {
    trips = [
        {
            tripId: 'seed-trip-1',
            travellerId: 'seed-traveller-1',
            planId: 'seed-plan-1',
            guideId: 'seed-guide-1',
            sourceCityId: 'city-delhi-1',
            destCityId: 'city-jaipur-1',
            servicePartners: ['seed-hotel-1'],
            locations: ['loc-delhi-1', 'loc-jaipur-1'],
            startDate: '2025-12-01',
            endDate: '2025-12-08',
            status: trip_entity_1.TripStatus.PLANNED,
            totalCost: 25000,
        },
    ];
    create(data) {
        const trip = { tripId: (0, uuid_1.v4)(), ...data };
        this.trips.push(trip);
        return trip;
    }
    findAll() {
        return this.trips;
    }
    findById(tripId) {
        return this.trips.find((t) => t.tripId === tripId);
    }
    findByTraveller(travellerId) {
        return this.trips.filter((t) => t.travellerId === travellerId);
    }
    findByGuide(guideId) {
        return this.trips.filter((t) => t.guideId === guideId);
    }
    update(tripId, data) {
        const idx = this.trips.findIndex((t) => t.tripId === tripId);
        if (idx === -1)
            return undefined;
        this.trips[idx] = { ...this.trips[idx], ...data };
        return this.trips[idx];
    }
    delete(tripId) {
        const idx = this.trips.findIndex((t) => t.tripId === tripId);
        if (idx === -1)
            return false;
        this.trips.splice(idx, 1);
        return true;
    }
};
exports.TripsRepository = TripsRepository;
exports.TripsRepository = TripsRepository = __decorate([
    (0, common_1.Injectable)()
], TripsRepository);
//# sourceMappingURL=trips.repository.js.map