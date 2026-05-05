import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from '../entities/trip.entity';

export class CreateTripDto {
  @ApiProperty({ example: 'seed-traveller-1' })
  @IsString()
  travellerId!: string;

  @ApiProperty({ example: 'seed-plan-1' })
  @IsString()
  planId!: string;

  @ApiProperty({ example: 'seed-guide-1' })
  @IsString()
  guideId!: string;

  @ApiProperty({ example: 'Delhi' })
  @IsString()
  sourceCity!: string;

  @ApiProperty({ example: 'Jaipur' })
  @IsString()
  destCity!: string;

  @ApiProperty({ example: ['seed-hotel-1', 'seed-exp-1'] })
  @IsArray()
  @IsString({ each: true })
  servicePartners!: string[];

  @ApiProperty({ example: ['loc-delhi-1', 'loc-jaipur-1'] })
  @IsArray()
  @IsString({ each: true })
  locations!: string[];

  @ApiProperty({ example: '2025-12-01' })
  @IsString()
  startDate!: string;

  @ApiProperty({ example: '2025-12-08' })
  @IsString()
  endDate!: string;

  @ApiProperty({ enum: TripStatus, example: TripStatus.PLANNED })
  @IsEnum(TripStatus)
  status!: TripStatus;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  @Min(0)
  totalCost!: number;
}
