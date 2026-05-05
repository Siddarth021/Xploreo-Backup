import {
  IsEnum,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  ExperienceCategory,
  ExperienceAvailability,
} from '../entities/experience.entity';

export class CreateExperienceDto {
  @ApiProperty({ example: 'Sunrise Trek to Tiger Hill' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'A breathtaking 4-hour guided trek to Tiger Hill' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(1)
  durationHours!: number;

  @ApiProperty({ example: 'provider-uuid-1' })
  @IsString()
  providerId!: string;

  @ApiProperty({ example: 'loc-darjeeling-1' })
  @IsString()
  locationId!: string;

  @ApiProperty({ enum: ExperienceCategory, example: ExperienceCategory.ADVENTURE })
  @IsEnum(ExperienceCategory)
  category!: ExperienceCategory;

  @ApiProperty({ enum: ExperienceAvailability, example: ExperienceAvailability.AVAILABLE })
  @IsEnum(ExperienceAvailability)
  availability!: ExperienceAvailability;

  @ApiProperty({ example: 15 })
  @IsNumber()
  @Min(1)
  maxParticipants!: number;
}
