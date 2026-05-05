import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty({ example: 'hotel-grand-goa' })
  @IsString()
  id!: string;

  @ApiProperty({ example: 'The Grand Xploreo Goa' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Goa' })
  @IsString()
  city!: string;

  @ApiProperty({ example: 'Calangute Beach, Goa' })
  @IsString()
  location!: string;

  @ApiProperty({ example: 'Luxury beachfront hotel with sunrise views and curated stays.' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  stars!: number;

  @ApiProperty({ example: 4.8 })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating!: number;

  @ApiProperty({ example: 312 })
  @IsNumber()
  @Min(0)
  reviewCount!: number;

  @ApiProperty({ example: 285 })
  @IsNumber()
  @Min(0)
  pricePerNight!: number;

  @ApiPropertyOptional({ example: 42 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  taxesAndFees?: number;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' })
  @IsString()
  image!: string;

  @ApiProperty({ example: ['Pool', 'Breakfast Included', 'Airport Transfer'] })
  @IsArray()
  @IsString({ each: true })
  amenities!: string[];

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
