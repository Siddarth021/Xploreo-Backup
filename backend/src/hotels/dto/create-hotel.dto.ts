import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty({ example: 'The Grand Xploreo' })
  @IsString()
  hotel_name!: string;

  @ApiProperty({ example: 'loc-goa-beach-1' })
  @IsString()
  location!: string;

  @ApiProperty({ example: 'Luxury beachfront hotel with all amenities' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 8321456789 })
  @IsNumber()
  contact_number!: number;

  @ApiProperty({ example: 'hotel@grandxploreo.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: 'TAX-GJ-12345' })
  @IsOptional()
  @IsString()
  tax_id?: string;

  @ApiPropertyOptional({ example: '****1234' })
  @IsOptional()
  @IsString()
  bank_account_number?: string;

  @ApiProperty({ example: '14:00' })
  @IsString()
  check_in_time!: string;

  @ApiProperty({ example: '11:00' })
  @IsString()
  check_out_time!: string;

  @ApiPropertyOptional({ example: 'Free cancellation within 24 hours' })
  @IsOptional()
  @IsString()
  cancellation_policy?: string;
}
