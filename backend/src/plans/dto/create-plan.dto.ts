import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Duration, Availability, TripCategory } from '../entities/plan.entity';

export class CreatePlanDto {
  @ApiProperty({ example: 'Golden Triangle Tour' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Explore Delhi, Agra and Jaipur in 7 days' })
  @IsString()
  desc!: string;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ enum: Duration, example: Duration.SEVEN_DAYS_SIX_NIGHTS })
  @IsEnum(Duration)
  duration!: Duration;

  @ApiProperty({ example: 'Rajasthan' })
  @IsString()
  destination!: string;

  @ApiProperty({ example: ['loc-delhi-1', 'loc-agra-1', 'loc-jaipur-1'] })
  @IsArray()
  @IsString({ each: true })
  location!: string[];

  @ApiProperty({ enum: TripCategory, example: TripCategory.ADVENTURE })
  @IsEnum(TripCategory)
  category!: TripCategory;

  @ApiProperty({ enum: Availability, example: Availability.A })
  @IsEnum(Availability)
  availability!: Availability;
}
