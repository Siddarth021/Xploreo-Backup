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
exports.CreateHotelDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateHotelDto {
    ownerUserId;
    hotel_name;
    location;
    description;
    contact_number;
    email;
    tax_id;
    bank_account_number;
    check_in_time;
    check_out_time;
    cancellation_policy;
}
exports.CreateHotelDto = CreateHotelDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user-id-123', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "ownerUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'The Grand Xploreo' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "hotel_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'loc-goa-beach-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Luxury beachfront hotel with all amenities' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8321456789 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateHotelDto.prototype, "contact_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'hotel@grandxploreo.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'TAX-GJ-12345' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "tax_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '****1234' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "bank_account_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '14:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "check_in_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "check_out_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Free cancellation within 24 hours' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "cancellation_policy", void 0);
//# sourceMappingURL=create-hotel.dto.js.map