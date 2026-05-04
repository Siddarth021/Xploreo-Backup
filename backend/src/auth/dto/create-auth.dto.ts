import { IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
    @IsString()
    username!: string;

    @IsString()
    @MinLength(6)
    password!: string;
}
