"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const auth_module_1 = require("../auth/auth.module");
const guide_module_1 = require("../guide/guide.module");
const traveller_module_1 = require("../traveller/traveller.module");
const superadmin_module_1 = require("../superadmin/superadmin.module");
const techadmin_module_1 = require("../techadmin/techadmin.module");
const nontechadmin_module_1 = require("../nontechadmin/nontechadmin.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            guide_module_1.GuideModule,
            traveller_module_1.TravellerModule,
            superadmin_module_1.SuperadminModule,
            techadmin_module_1.TechadminModule,
            nontechadmin_module_1.NontechadminModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map