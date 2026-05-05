"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechadminModule = void 0;
const common_1 = require("@nestjs/common");
const techadmin_service_1 = require("./techadmin.service");
const techadmin_controller_1 = require("./techadmin.controller");
const techadmin_repository_1 = require("./techadmin.repository");
let TechadminModule = class TechadminModule {
};
exports.TechadminModule = TechadminModule;
exports.TechadminModule = TechadminModule = __decorate([
    (0, common_1.Module)({
        controllers: [techadmin_controller_1.TechadminController],
        providers: [techadmin_service_1.TechadminService, techadmin_repository_1.TechadminRepository],
    })
], TechadminModule);
//# sourceMappingURL=techadmin.module.js.map