"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NontechadminModule = void 0;
const common_1 = require("@nestjs/common");
const nontechadmin_service_1 = require("./nontechadmin.service");
const nontechadmin_controller_1 = require("./nontechadmin.controller");
const nontechadmin_repository_1 = require("./nontechadmin.repository");
let NontechadminModule = class NontechadminModule {
};
exports.NontechadminModule = NontechadminModule;
exports.NontechadminModule = NontechadminModule = __decorate([
    (0, common_1.Module)({
        controllers: [nontechadmin_controller_1.NontechadminController],
        providers: [nontechadmin_service_1.NontechadminService, nontechadmin_repository_1.NontechadminRepository],
    })
], NontechadminModule);
//# sourceMappingURL=nontechadmin.module.js.map