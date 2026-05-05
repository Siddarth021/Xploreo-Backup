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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const auth_service_1 = require("../auth/auth.service");
const guide_service_1 = require("../guide/guide.service");
const traveller_service_1 = require("../traveller/traveller.service");
const superadmin_service_1 = require("../superadmin/superadmin.service");
const techadmin_service_1 = require("../techadmin/techadmin.service");
const nontechadmin_service_1 = require("../nontechadmin/nontechadmin.service");
const auth_entity_1 = require("../auth/entities/auth.entity");
let UsersService = class UsersService {
    authService;
    guideService;
    travellerService;
    superadminService;
    techadminService;
    nontechadminService;
    constructor(authService, guideService, travellerService, superadminService, techadminService, nontechadminService) {
        this.authService = authService;
        this.guideService = guideService;
        this.travellerService = travellerService;
        this.superadminService = superadminService;
        this.techadminService = techadminService;
        this.nontechadminService = nontechadminService;
    }
    registerGuide(dto) {
        const userId = (0, uuid_1.v4)();
        const auth = this.authService.register({ ...dto.authData, userId, role: auth_entity_1.Role.GUIDE });
        const profile = this.guideService.create({ ...dto.profileData, userId });
        return { message: 'Guide registered successfully', userId, auth, profile };
    }
    findAll() {
        return this.authService.findAll();
    }
    findOne(id) {
        return this.authService.findOne(id);
    }
    update(id, dto) {
        return this.authService.update(id, dto);
    }
    remove(id) {
        return this.authService.remove(id);
    }
    registerTraveller(dto) {
        const userId = (0, uuid_1.v4)();
        const auth = this.authService.register({ ...dto.authData, userId, role: auth_entity_1.Role.TRAVELLER });
        const profile = this.travellerService.create({ ...dto.profileData, userId });
        return { message: 'Traveller registered successfully', userId, auth, profile };
    }
    registerSuperadmin(dto) {
        const userId = (0, uuid_1.v4)();
        const auth = this.authService.register({ ...dto.authData, userId, role: auth_entity_1.Role.SUPERADMIN });
        const profile = this.superadminService.create({ ...dto.profileData, userId });
        return { message: 'Superadmin registered successfully', userId, auth, profile };
    }
    registerTechadmin(dto) {
        const userId = (0, uuid_1.v4)();
        const auth = this.authService.register({ ...dto.authData, userId, role: auth_entity_1.Role.TECHADMIN });
        const profile = this.techadminService.create({ ...dto.profileData, userId });
        return { message: 'Techadmin registered successfully', userId, auth, profile };
    }
    registerNontechadmin(dto) {
        const userId = (0, uuid_1.v4)();
        const auth = this.authService.register({ ...dto.authData, userId, role: auth_entity_1.Role.NONTECHADMIN });
        const profile = this.nontechadminService.create({ ...dto.profileData, userId });
        return { message: 'Nontechadmin registered successfully', userId, auth, profile };
    }
    getFullProfile(userId) {
        const auth = this.authService.findOne(userId);
        let profile = null;
        try {
            if (auth.role === auth_entity_1.Role.SUPERADMIN)
                profile = this.superadminService.findOne(userId);
            else if (auth.role === auth_entity_1.Role.TECHADMIN)
                profile = this.techadminService.findOne(userId);
            else if (auth.role === auth_entity_1.Role.NONTECHADMIN)
                profile = this.nontechadminService.findOne(userId);
            else if (auth.role === auth_entity_1.Role.GUIDE)
                profile = this.guideService.findOne(userId);
            else if (auth.role === auth_entity_1.Role.TRAVELLER)
                profile = this.travellerService.findOne(userId);
        }
        catch (e) {
        }
        return { auth, profile };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        guide_service_1.GuideService,
        traveller_service_1.TravellerService,
        superadmin_service_1.SuperadminService,
        techadmin_service_1.TechadminService,
        nontechadmin_service_1.NontechadminService])
], UsersService);
//# sourceMappingURL=users.service.js.map