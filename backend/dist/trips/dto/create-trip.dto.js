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
exports.CreateTripDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const trip_entity_1 = require("../entities/trip.entity");
class CreateTripDto {
    travellerId;
    planId;
    guideId;
    sourceCityId;
    destCityId;
    servicePartners;
    locations;
    startDate;
    endDate;
    status;
    totalCost;
}
exports.CreateTripDto = CreateTripDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'seed-traveller-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "travellerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'seed-plan-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'seed-guide-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "guideId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'city-delhi-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "sourceCityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'city-jaipur-1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "destCityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['seed-hotel-1', 'seed-exp-1'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTripDto.prototype, "servicePartners", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['loc-delhi-1', 'loc-jaipur-1'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateTripDto.prototype, "locations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-12-01' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-12-08' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: trip_entity_1.TripStatus, example: trip_entity_1.TripStatus.PLANNED }),
    (0, class_validator_1.IsEnum)(trip_entity_1.TripStatus),
    __metadata("design:type", String)
], CreateTripDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "totalCost", void 0);
//# sourceMappingURL=create-trip.dto.js.map