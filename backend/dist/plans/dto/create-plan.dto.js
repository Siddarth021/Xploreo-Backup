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
exports.CreatePlanDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const plan_entity_1 = require("../entities/plan.entity");
class CreatePlanDto {
    title;
    desc;
    price;
    duration;
    destination;
    location;
    category;
    availability;
}
exports.CreatePlanDto = CreatePlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Golden Triangle Tour' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Explore Delhi, Agra and Jaipur in 7 days' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plan_entity_1.Duration, example: plan_entity_1.Duration.SEVEN_DAYS_SIX_NIGHTS }),
    (0, class_validator_1.IsEnum)(plan_entity_1.Duration),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rajasthan' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['loc-delhi-1', 'loc-agra-1', 'loc-jaipur-1'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreatePlanDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plan_entity_1.TripCategory, example: plan_entity_1.TripCategory.ADVENTURE }),
    (0, class_validator_1.IsEnum)(plan_entity_1.TripCategory),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plan_entity_1.Availability, example: plan_entity_1.Availability.A }),
    (0, class_validator_1.IsEnum)(plan_entity_1.Availability),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "availability", void 0);
//# sourceMappingURL=create-plan.dto.js.map