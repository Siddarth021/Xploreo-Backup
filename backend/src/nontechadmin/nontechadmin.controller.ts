import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { NontechadminService } from './nontechadmin.service';
import { CreateNontechadminDto } from './dto/create-nontechadmin.dto';
import { UpdateNontechadminDto } from './dto/update-nontechadmin.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Nontechadmin')
@ApiHeader({ name: 'x-user-id', required: true })
@ApiHeader({ name: 'x-user-role', required: true })
@Roles(Role.SUPERADMIN)
@Controller('nontechadmin')
export class NontechadminController {
  constructor(private readonly nontechadminService: NontechadminService) {}

  @Post()
  @ApiOperation({ summary: 'Create a non-tech admin' })
  create(@Body() dto: CreateNontechadminDto) { return this.nontechadminService.create(dto); }

  @Get()
  @ApiOperation({ summary: 'List all non-tech admins' })
  findAll() { return this.nontechadminService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get non-tech admin by ID' })
  findOne(@Param('id') id: string) { return this.nontechadminService.findOne(id); }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a non-tech admin' })
  update(@Param('id') id: string, @Body() dto: UpdateNontechadminDto) { return this.nontechadminService.update(id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a non-tech admin' })
  remove(@Param('id') id: string) { return this.nontechadminService.remove(id); }
}
