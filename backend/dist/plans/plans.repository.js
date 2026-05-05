"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansRepository = void 0;
const common_1 = require("@nestjs/common");
const plan_entity_1 = require("./entities/plan.entity");
const uuid_1 = require("uuid");
let PlansRepository = class PlansRepository {
    plans = [
        {
            planId: 'seed-plan-1',
            title: 'Golden Triangle Tour',
            desc: 'Explore Delhi, Agra and Jaipur in 7 days',
            price: 25000,
            duration: plan_entity_1.Duration.SEVEN_DAYS_SIX_NIGHTS,
            destination: 'Rajasthan',
            location: ['loc-delhi-1', 'loc-agra-1', 'loc-jaipur-1'],
            category: plan_entity_1.TripCategory.ADVENTURE,
            availability: plan_entity_1.Availability.A,
        },
        {
            planId: 'seed-plan-2',
            title: 'Kerala Backwaters Luxury',
            desc: 'Luxury houseboat experience through Kerala backwaters',
            price: 45000,
            duration: plan_entity_1.Duration.FIVE_DAYS_FOUR_NIGHTS,
            destination: 'Kerala',
            location: ['loc-cochin-1', 'loc-alleppey-1'],
            category: plan_entity_1.TripCategory.LUXURY,
            availability: plan_entity_1.Availability.A,
        },
    ];
    create(data) {
        const plan = { planId: (0, uuid_1.v4)(), ...data };
        this.plans.push(plan);
        return plan;
    }
    findAll(options) {
        let filtered = [...this.plans];
        if (options?.category) {
            filtered = filtered.filter((p) => p.category === options.category);
        }
        if (options?.destination) {
            filtered = filtered.filter((p) => p.destination
                .toLowerCase()
                .includes(options.destination.toLowerCase()));
        }
        if (options?.availability) {
            filtered = filtered.filter((p) => p.availability === options.availability);
        }
        const total = filtered.length;
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 10;
        const start = (page - 1) * limit;
        const data = filtered.slice(start, start + limit);
        return { data, total, page, limit };
    }
    findById(planId) {
        return this.plans.find((p) => p.planId === planId);
    }
    update(planId, data) {
        const idx = this.plans.findIndex((p) => p.planId === planId);
        if (idx === -1)
            return undefined;
        this.plans[idx] = { ...this.plans[idx], ...data };
        return this.plans[idx];
    }
    delete(planId) {
        const idx = this.plans.findIndex((p) => p.planId === planId);
        if (idx === -1)
            return false;
        this.plans.splice(idx, 1);
        return true;
    }
};
exports.PlansRepository = PlansRepository;
exports.PlansRepository = PlansRepository = __decorate([
    (0, common_1.Injectable)()
], PlansRepository);
//# sourceMappingURL=plans.repository.js.map