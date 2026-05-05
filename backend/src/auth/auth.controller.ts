import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from './entities/auth.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login and receive a token' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Roles(Role.SUPERADMIN)
  @Get('users')
  @ApiOperation({ summary: 'List all users (SuperAdmin only)' })
  findAll() {
    return this.authService.findAll();
  }

  @Roles(Role.SUPERADMIN)
  @Get('users/:id')
  @ApiOperation({ summary: 'Get a user by ID' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Roles(Role.SUPERADMIN)
  @Patch('users/:id')
  @ApiOperation({ summary: 'Update a user' })
  update(@Param('id') id: string, @Body() dto: UpdateAuthDto) {
    return this.authService.update(id, dto);
  }

  @Roles(Role.SUPERADMIN)
  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete a user' })
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
