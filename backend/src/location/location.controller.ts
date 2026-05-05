import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation,ApiBearerAuth } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Location')
@ApiBearerAuth()
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Roles(Role.SUPERADMIN, Role.TECHADMIN)
  @Post()
  @ApiOperation({ summary: 'Add a location' })
  create(@Body() dto: CreateLocationDto) { return this.locationService.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  findAll() { return this.locationService.findAll(); }

  @Get('city/:cityId')
  @ApiOperation({ summary: 'Get locations by city' })
  findByCity(@Param('cityId') cityId: string) { return this.locationService.findByCity(cityId); }

  @Get(':id')
  @ApiOperation({ summary: 'Get location by ID' })
  findOne(@Param('id') id: string) { return this.locationService.findOne(id); }

  @Roles(Role.SUPERADMIN, Role.TECHADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a location' })
  update(@Param('id') id: string, @Body() dto: UpdateLocationDto) { return this.locationService.update(id, dto); }

  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location' })
  remove(@Param('id') id: string) { return this.locationService.remove(id); }
}
