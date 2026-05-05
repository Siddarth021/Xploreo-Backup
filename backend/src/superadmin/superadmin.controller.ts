import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { SuperadminService } from './superadmin.service';
import { CreateSuperadminDto } from './dto/create-superadmin.dto';
import { UpdateSuperadminDto } from './dto/update-superadmin.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Superadmin')
@ApiHeader({ name: 'x-user-id', required: true })
@ApiHeader({ name: 'x-user-role', required: true })
@Roles(Role.SUPERADMIN)
@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly superadminService: SuperadminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a superadmin' })
  create(@Body() dto: CreateSuperadminDto) { return this.superadminService.create(dto); }

  @Get()
  @ApiOperation({ summary: 'List all superadmins' })
  findAll() { return this.superadminService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get superadmin by ID' })
  findOne(@Param('id') id: string) { return this.superadminService.findOne(id); }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a superadmin' })
  update(@Param('id') id: string, @Body() dto: UpdateSuperadminDto) { return this.superadminService.update(id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a superadmin' })
  remove(@Param('id') id: string) { return this.superadminService.remove(id); }
}
