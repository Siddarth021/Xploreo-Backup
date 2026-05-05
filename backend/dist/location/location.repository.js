"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRepository = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let LocationRepository = class LocationRepository {
    locations = [
        { locationId: 'loc-mumbai-1', locationName: 'Juhu Beach', cityId: 'city-mumbai-1' },
        { locationId: 'loc-delhi-1', locationName: 'India Gate', cityId: 'city-delhi-1' },
        { locationId: 'loc-jaipur-1', locationName: 'Hawa Mahal', cityId: 'city-jaipur-1' },
        { locationId: 'loc-goa-beach-1', locationName: 'Calangute Beach', cityId: 'city-goa-1' },
        { locationId: 'loc-darjeeling-1', locationName: 'Tiger Hill', cityId: 'city-kerala-1' },
    ];
    create(data) {
        const loc = { locationId: (0, uuid_1.v4)(), ...data };
        this.locations.push(loc);
        return loc;
    }
    findAll() { return this.locations; }
    findById(id) {
        return this.locations.find((l) => l.locationId === id);
    }
    findByCity(cityId) {
        return this.locations.filter((l) => l.cityId === cityId);
    }
    update(id, data) {
        const idx = this.locations.findIndex((l) => l.locationId === id);
        if (idx === -1)
            return undefined;
        this.locations[idx] = { ...this.locations[idx], ...data };
        return this.locations[idx];
    }
    delete(id) {
        const idx = this.locations.findIndex((l) => l.locationId === id);
        if (idx === -1)
            return false;
        this.locations.splice(idx, 1);
        return true;
    }
};
exports.LocationRepository = LocationRepository;
exports.LocationRepository = LocationRepository = __decorate([
    (0, common_1.Injectable)()
], LocationRepository);
//# sourceMappingURL=location.repository.js.map