"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const trips_service_1 = require("../trips/trips.service");
const guide_service_1 = require("../guide/guide.service");
const trip_entity_1 = require("../trips/entities/trip.entity");
let StatsService = class StatsService {
    authService;
    tripsService;
    guideService;
    constructor(authService, tripsService, guideService) {
        this.authService = authService;
        this.tripsService = tripsService;
        this.guideService = guideService;
    }
    getAdminDashboardStats() {
        const allUsers = this.authService.findAll();
        const allTrips = this.tripsService.findAll();
        const totalUsers = allUsers.length;
        const totalBookings = allTrips.length;
        const totalRevenue = allTrips.reduce((acc, trip) => {
            const cost = typeof trip.totalCost === 'number' ? trip.totalCost : 100;
            return acc + cost;
        }, 0);
        const completedTrips = allTrips.filter(t => t.status === trip_entity_1.TripStatus.COMPLETED);
        const activeGuides = new Set(completedTrips.map(t => t.guideId));
        return {
            totalUsers,
            totalBookings,
            totalRevenue,
            activePartners: activeGuides.size,
        };
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        trips_service_1.TripsService,
        guide_service_1.GuideService])
], StatsService);
//# sourceMappingURL=stats.service.js.map