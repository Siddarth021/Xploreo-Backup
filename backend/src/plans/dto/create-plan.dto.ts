import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class PlanItineraryItemDto {
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

export class CreatePlanDto {
  @ApiProperty({ example: 'plan-kyoto-cultural-escape' })
  @IsString()
  id!: string;

  @ApiProperty({ example: 'Kyoto Cultural Escape' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Temple trails, tea ceremony, and a relaxed final evening in Gion.' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'Hyderabad' })
  @IsString()
  originCity!: string;

  @ApiProperty({ example: 'Kyoto, Japan' })
  @IsString()
  destination!: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  durationNights!: number;

  @ApiProperty({ example: 251000 })
  @IsNumber()
  @Min(0)
  pricePerPerson!: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  hotelStars!: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  includesFlight!: boolean;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1528164344705-47542687000d' })
  @IsString()
  image!: string;

  @ApiProperty({ example: ['Culture', 'Luxury', 'Guided'] })
  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @ApiProperty({ type: [PlanItineraryItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanItineraryItemDto)
  itinerary!: PlanItineraryItemDto[];
}
