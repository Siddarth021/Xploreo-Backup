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
exports.CreateUserDto = exports.RegisterNontechadminDto = exports.RegisterTechadminDto = exports.RegisterSuperadminDto = exports.RegisterTravellerDto = exports.RegisterGuideDto = exports.UserRole = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_auth_dto_1 = require("../../auth/dto/create-auth.dto");
const create_guide_dto_1 = require("../../guide/dto/create-guide.dto");
const create_traveller_dto_1 = require("../../traveller/dto/create-traveller.dto");
const create_superadmin_dto_1 = require("../../superadmin/dto/create-superadmin.dto");
const create_techadmin_dto_1 = require("../../techadmin/dto/create-techadmin.dto");
const create_nontechadmin_dto_1 = require("../../nontechadmin/dto/create-nontechadmin.dto");
var UserRole;
(function (UserRole) {
    UserRole["GUIDE"] = "guide";
    UserRole["TRAVELLER"] = "traveller";
    UserRole["SUPERADMIN"] = "superadmin";
    UserRole["TECHADMIN"] = "techadmin";
    UserRole["NONTECHADMIN"] = "nontechadmin";
})(UserRole || (exports.UserRole = UserRole = {}));
class RegisterGuideDto {
    authData;
    profileData;
}
exports.RegisterGuideDto = RegisterGuideDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_auth_dto_1.RegisterDto),
    __metadata("design:type", create_auth_dto_1.RegisterDto)
], RegisterGuideDto.prototype, "authData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_guide_dto_1.CreateGuideDto),
    __metadata("design:type", create_guide_dto_1.CreateGuideDto)
], RegisterGuideDto.prototype, "profileData", void 0);
class RegisterTravellerDto {
    authData;
    profileData;
}
exports.RegisterTravellerDto = RegisterTravellerDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_auth_dto_1.RegisterDto),
    __metadata("design:type", create_auth_dto_1.RegisterDto)
], RegisterTravellerDto.prototype, "authData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_traveller_dto_1.CreateTravellerDto),
    __metadata("design:type", create_traveller_dto_1.CreateTravellerDto)
], RegisterTravellerDto.prototype, "profileData", void 0);
class RegisterSuperadminDto {
    authData;
    profileData;
}
exports.RegisterSuperadminDto = RegisterSuperadminDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_auth_dto_1.RegisterDto),
    __metadata("design:type", create_auth_dto_1.RegisterDto)
], RegisterSuperadminDto.prototype, "authData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_superadmin_dto_1.CreateSuperadminDto),
    __metadata("design:type", create_superadmin_dto_1.CreateSuperadminDto)
], RegisterSuperadminDto.prototype, "profileData", void 0);
class RegisterTechadminDto {
    authData;
    profileData;
}
exports.RegisterTechadminDto = RegisterTechadminDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_auth_dto_1.RegisterDto),
    __metadata("design:type", create_auth_dto_1.RegisterDto)
], RegisterTechadminDto.prototype, "authData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_techadmin_dto_1.CreateTechadminDto),
    __metadata("design:type", create_techadmin_dto_1.CreateTechadminDto)
], RegisterTechadminDto.prototype, "profileData", void 0);
class RegisterNontechadminDto {
    authData;
    profileData;
}
exports.RegisterNontechadminDto = RegisterNontechadminDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_auth_dto_1.RegisterDto),
    __metadata("design:type", create_auth_dto_1.RegisterDto)
], RegisterNontechadminDto.prototype, "authData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_nontechadmin_dto_1.CreateNontechadminDto),
    __metadata("design:type", create_nontechadmin_dto_1.CreateNontechadminDto)
], RegisterNontechadminDto.prototype, "profileData", void 0);
class CreateUserDto {
    role;
    authData;
    profileData;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: UserRole }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_auth_dto_1.RegisterDto),
    __metadata("design:type", create_auth_dto_1.RegisterDto)
], CreateUserDto.prototype, "authData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Profile data based on role',
    }),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "profileData", void 0);
//# sourceMappingURL=create-user.dto.js.map