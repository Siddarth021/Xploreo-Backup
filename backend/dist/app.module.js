"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const traveller_module_1 = require("./traveller/traveller.module");
const guide_module_1 = require("./guide/guide.module");
const hotels_module_1 = require("./hotels/hotels.module");
const experiences_module_1 = require("./experiences/experiences.module");
const superadmin_module_1 = require("./superadmin/superadmin.module");
const techadmin_module_1 = require("./techadmin/techadmin.module");
const nontechadmin_module_1 = require("./nontechadmin/nontechadmin.module");
const plans_module_1 = require("./plans/plans.module");
const trips_module_1 = require("./trips/trips.module");
const location_module_1 = require("./location/location.module");
const cities_module_1 = require("./cities/cities.module");
const users_module_1 = require("./users/users.module");
const stats_module_1 = require("./stats/stats.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            traveller_module_1.TravellerModule,
            guide_module_1.GuideModule,
            hotels_module_1.HotelsModule,
            experiences_module_1.ExperiencesModule,
            superadmin_module_1.SuperadminModule,
            techadmin_module_1.TechadminModule,
            nontechadmin_module_1.NontechadminModule,
            plans_module_1.PlansModule,
            trips_module_1.TripsModule,
            location_module_1.LocationModule,
            cities_module_1.CitiesModule,
            users_module_1.UsersModule,
            stats_module_1.StatsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map