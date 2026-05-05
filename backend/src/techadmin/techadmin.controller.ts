import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiBearerAuth } from '@nestjs/swagger';
import { TechadminService } from './techadmin.service';
import { CreateTechadminDto } from './dto/create-techadmin.dto';
import { UpdateTechadminDto } from './dto/update-techadmin.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Techadmin')
@Roles(Role.SUPERADMIN)
@ApiBearerAuth()
@Controller('techadmin')
export class TechadminController {
  constructor(private readonly techadminService: TechadminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a tech admin' })
  create(@Body() dto: CreateTechadminDto) { return this.techadminService.create(dto); }

  @Get()
  @ApiOperation({ summary: 'List all tech admins' })
  findAll() { return this.techadminService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get tech admin by ID' })
  findOne(@Param('id') id: string) { return this.techadminService.findOne(id); }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tech admin' })
  update(@Param('id') id: string, @Body() dto: UpdateTechadminDto) { return this.techadminService.update(id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tech admin' })
  remove(@Param('id') id: string) { return this.techadminService.remove(id); }
}
