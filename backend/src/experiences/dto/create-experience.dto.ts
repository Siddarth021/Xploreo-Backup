import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ExperienceAvailability,
  ExperienceCategory,
} from '../entities/experience.entity';

class ExperienceSlotDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsString()
  date!: string;

  @ApiProperty()
  @IsString()
  time!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  booked!: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  capacity!: number;

  @ApiProperty()
  available!: boolean;
}

export class CreateExperienceDto {
  @ApiProperty({ example: 'exp-sunset-walk' })
  @IsString()
  id!: string;

  @ApiProperty({ example: 'Sunset Beach Photography Walk' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Golden-hour guided walk for photographers and first-time visitors.' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'Goa' })
  @IsString()
  destination!: string;

  @ApiProperty({ enum: ExperienceCategory, example: ExperienceCategory.PHOTOGRAPHY })
  @IsEnum(ExperienceCategory)
  category!: ExperienceCategory;

  @ApiProperty({ enum: ExperienceAvailability, example: ExperienceAvailability.AVAILABLE })
  @IsEnum(ExperienceAvailability)
  availability!: ExperienceAvailability;

  @ApiProperty({ example: 75 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  durationHours!: number;

  @ApiProperty({ example: 12 })
  @IsNumber()
  @Min(1)
  capacity!: number;

  @ApiProperty({ example: 8 })
  @IsNumber()
  @Min(0)
  booked!: number;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' })
  @IsString()
  image!: string;

  @ApiProperty({ example: '10:00 AM' })
  @IsString()
  nextSlot!: string;

  @ApiProperty({ type: [ExperienceSlotDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceSlotDto)
  slots!: ExperienceSlotDto[];
}
