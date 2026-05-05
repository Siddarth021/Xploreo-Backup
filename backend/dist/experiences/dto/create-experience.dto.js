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
exports.CreateExperienceDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const experience_entity_1 = require("../entities/experience.entity");
class CreateExperienceDto {
    title;
    description;
    price;
    durationHours;
    providerId;
    locationId;
    category;
    availability;
    maxParticipants;
}
exports.CreateExperienceDto = CreateExperienceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sunrise Trek to Tiger Hill' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A breathtaking 4-hour guided trek to Tiger Hill' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateExperienceDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateExperienceDto.prototype, "durationHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'provider-uuid-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'loc-darjeeling-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "locationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: experience_entity_1.ExperienceCategory, example: experience_entity_1.ExperienceCategory.ADVENTURE }),
    (0, class_validator_1.IsEnum)(experience_entity_1.ExperienceCategory),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: experience_entity_1.ExperienceAvailability, example: experience_entity_1.ExperienceAvailability.AVAILABLE }),
    (0, class_validator_1.IsEnum)(experience_entity_1.ExperienceAvailability),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "availability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateExperienceDto.prototype, "maxParticipants", void 0);
//# sourceMappingURL=create-experience.dto.js.map