"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesRepository = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let CitiesRepository = class CitiesRepository {
    cities = [
        { id: 'city-mumbai-1', name: 'Mumbai' },
        { id: 'city-delhi-1', name: 'Delhi' },
        { id: 'city-jaipur-1', name: 'Jaipur' },
        { id: 'city-goa-1', name: 'Goa' },
        { id: 'city-kerala-1', name: 'Kerala' },
    ];
    create(data) {
        const city = { id: (0, uuid_1.v4)(), ...data };
        this.cities.push(city);
        return city;
    }
    findAll() { return this.cities; }
    findByName(name) {
        return this.cities.find((c) => c.name.toLowerCase() === name.toLowerCase());
    }
    findById(id) {
        return this.cities.find((c) => c.id === id);
    }
    update(id, data) {
        const idx = this.cities.findIndex((c) => c.id === id);
        if (idx === -1)
            return undefined;
        this.cities[idx] = { ...this.cities[idx], ...data };
        return this.cities[idx];
    }
    delete(id) {
        const idx = this.cities.findIndex((c) => c.id === id);
        if (idx === -1)
            return false;
        this.cities.splice(idx, 1);
        return true;
    }
};
exports.CitiesRepository = CitiesRepository;
exports.CitiesRepository = CitiesRepository = __decorate([
    (0, common_1.Injectable)()
], CitiesRepository);
//# sourceMappingURL=cities.repository.js.map