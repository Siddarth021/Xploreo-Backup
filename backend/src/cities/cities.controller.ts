import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiBearerAuth } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Cities')
@ApiBearerAuth()
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Roles(Role.SUPERADMIN, Role.TECHADMIN)
  @Post()
  @ApiOperation({ summary: 'Add a city' })
  create(@Body() dto: CreateCityDto) { return this.citiesService.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  findAll() { return this.citiesService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get city by ID' })
  findOne(@Param('id') id: string) { return this.citiesService.findOne(id); }

  @Roles(Role.SUPERADMIN, Role.TECHADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a city' })
  update(@Param('id') id: string, @Body() dto: UpdateCityDto) { return this.citiesService.update(id, dto); }

  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a city' })
  remove(@Param('id') id: string) { return this.citiesService.remove(id); }
}
