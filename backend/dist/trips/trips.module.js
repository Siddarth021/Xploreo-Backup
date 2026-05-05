"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsModule = void 0;
const common_1 = require("@nestjs/common");
const trips_service_1 = require("./trips.service");
const trips_controller_1 = require("./trips.controller");
const trips_repository_1 = require("./trips.repository");
const traveller_module_1 = require("../traveller/traveller.module");
const guide_module_1 = require("../guide/guide.module");
const plans_module_1 = require("../plans/plans.module");
const cities_module_1 = require("../cities/cities.module");
let TripsModule = class TripsModule {
};
exports.TripsModule = TripsModule;
exports.TripsModule = TripsModule = __decorate([
    (0, common_1.Module)({
        imports: [traveller_module_1.TravellerModule, guide_module_1.GuideModule, plans_module_1.PlansModule, cities_module_1.CitiesModule],
        controllers: [trips_controller_1.TripsController],
        providers: [trips_service_1.TripsService, trips_repository_1.TripsRepository],
        exports: [trips_service_1.TripsService, trips_repository_1.TripsRepository],
    })
], TripsModule);
//# sourceMappingURL=trips.module.js.map