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
exports.CreateGuideDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateGuideDto {
    userId;
    fname;
    lname;
    email;
    phone;
    location;
    prof_title;
    years_exp;
    bio;
    lang_spoken;
    certifications;
    bank_name;
    bank_acc_num_end;
    iban;
}
exports.CreateGuideDto = CreateGuideDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user-id-123', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuideDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ali' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuideDto.prototype, "fname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Khan' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuideDto.prototype, "lname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ali@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateGuideDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9876543210 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateGuideDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'loc-123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuideDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Senior Trek Guide' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuideDto.prototype, "prof_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateGuideDto.prototype, "years_exp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Passionate guide with 5+ years experience' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuideDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['English', 'Hindi'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateGuideDto.prototype, "lang_spoken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['First Aid', 'Mountain Rescue'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateGuideDto.prototype, "certifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'HDFC Bank' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuideDto.prototype, "bank_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1234 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateGuideDto.prototype, "bank_acc_num_end", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'IN12345678901234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(15),
    __metadata("design:type", String)
], CreateGuideDto.prototype, "iban", void 0);
//# sourceMappingURL=create-guide.dto.js.map