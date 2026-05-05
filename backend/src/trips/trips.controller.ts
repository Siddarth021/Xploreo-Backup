import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Trips')
@ApiHeader({ name: 'x-user-id', required: true })
@ApiHeader({ name: 'x-user-role', required: true })
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @ApiOperation({ summary: 'Book a trip' })
  create(@Body() dto: CreateTripDto) {
    return this.tripsService.create(dto);
  }

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all trips (admin)' })
  findAll() {
    return this.tripsService.findAll();
  }

  @Get('traveller/:travellerId')
  @ApiOperation({ summary: 'Get trips for a traveller' })
  findByTraveller(@Param('travellerId') travellerId: string) {
    return this.tripsService.findByTraveller(travellerId);
  }

  @Get('guide/:guideId')
  @ApiOperation({ summary: 'Get trips for a guide' })
  findByGuide(@Param('guideId') guideId: string) {
    return this.tripsService.findByGuide(guideId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trip by ID' })
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a trip' })
  update(@Param('id') id: string, @Body() dto: UpdateTripDto) {
    return this.tripsService.update(id, dto);
  }

  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip' })
  remove(@Param('id') id: string) {
    return this.tripsService.remove(id);
  }
}
