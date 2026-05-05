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
exports.CreateSuperadminDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSuperadminDto {
    userId;
    fname;
    lname;
    email;
    phone_number;
}
exports.CreateSuperadminDto = CreateSuperadminDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user-id-123', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSuperadminDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Raj' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSuperadminDto.prototype, "fname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sharma' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSuperadminDto.prototype, "lname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'raj@xploreo.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSuperadminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9988776655 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSuperadminDto.prototype, "phone_number", void 0);
//# sourceMappingURL=create-superadmin.dto.js.map