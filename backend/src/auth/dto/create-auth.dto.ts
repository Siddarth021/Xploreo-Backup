import { IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/auth.entity';

export class RegisterDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'secret123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ enum: Role, example: Role.TRAVELLER })
  @IsEnum(Role)
  role!: Role;
}
