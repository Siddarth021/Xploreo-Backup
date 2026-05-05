import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TripStatus, TripType } from '../entities/trip.entity';

class TripItineraryItemDto {
  @ApiProperty()
  @IsString()
  day!: string;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  detail!: string;
}

class TripDocumentDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  status!: string;
}

class PaymentBreakdownDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  flights!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  stay!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  activities!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  guide!: number;
}

export class CreateTripDto {
  @ApiProperty({ example: 'trip-kyoto-2026' })
  @IsString()
  id!: string;

  @ApiProperty({ example: '20001' })
  @IsString()
  travellerId!: string;

  @ApiProperty({ example: '10001' })
  @IsString()
  guideId!: string;

  @ApiProperty({ example: 'plan-kyoto-cultural-escape' })
  @IsString()
  planId!: string;

  @ApiProperty({ example: 'Kyoto Cultural Escape' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Kyoto, Japan' })
  @IsString()
  destination!: string;

  @ApiProperty({ example: 'Kyoto, Japan' })
  @IsString()
  location!: string;

  @ApiProperty({ example: '2026-10-12' })
  @IsString()
  startDate!: string;

  @ApiProperty({ example: '2026-10-17' })
  @IsString()
  endDate!: string;

  @ApiProperty({ enum: TripStatus, example: TripStatus.ONGOING })
  @IsEnum(TripStatus)
  status!: TripStatus;

  @ApiProperty({ example: 502000 })
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  guests!: number;

  @ApiProperty({ example: '5 days' })
  @IsString()
  durationLabel!: string;

  @ApiProperty({ enum: TripType, example: TripType.PACKAGE })
  @IsEnum(TripType)
  type!: TripType;

  @ApiProperty({ type: [TripItineraryItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TripItineraryItemDto)
  itinerary!: TripItineraryItemDto[];

  @ApiProperty({ example: 'Tea ceremony in Gion', required: false })
  @IsOptional()
  @IsString()
  currentLocation?: string;

  @ApiProperty({ type: PaymentBreakdownDto })
  @ValidateNested()
  @Type(() => PaymentBreakdownDto)
  paymentBreakdown!: PaymentBreakdownDto;

  @ApiProperty({ type: [TripDocumentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TripDocumentDto)
  documents!: TripDocumentDto[];
}
