"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravellerModule = void 0;
const common_1 = require("@nestjs/common");
const traveller_service_1 = require("./traveller.service");
const traveller_controller_1 = require("./traveller.controller");
const traveller_repository_1 = require("./traveller.repository");
let TravellerModule = class TravellerModule {
};
exports.TravellerModule = TravellerModule;
exports.TravellerModule = TravellerModule = __decorate([
    (0, common_1.Module)({
        controllers: [traveller_controller_1.TravellerController],
        providers: [traveller_service_1.TravellerService, traveller_repository_1.TravellerRepository],
        exports: [traveller_repository_1.TravellerRepository],
    })
], TravellerModule);
//# sourceMappingURL=traveller.module.js.map