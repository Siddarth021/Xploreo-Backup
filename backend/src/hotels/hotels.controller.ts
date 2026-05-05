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
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Hotels')
@ApiHeader({ name: 'x-user-id', required: true })
@ApiHeader({ name: 'x-user-role', required: true })
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN, Role.HOTEL)
  @Post()
  @ApiOperation({ summary: 'Register a hotel' })
  create(@Body() dto: CreateHotelDto) {
    return this.hotelsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get('location/:locationId')
  @ApiOperation({ summary: 'Get hotels by location' })
  findByLocation(@Param('locationId') locationId: string) {
    return this.hotelsService.findByLocation(locationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hotel by ID' })
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(id);
  }

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN, Role.HOTEL)
  @Patch(':id')
  @ApiOperation({ summary: 'Update hotel details' })
  update(@Param('id') id: string, @Body() dto: UpdateHotelDto) {
    return this.hotelsService.update(id, dto);
  }

  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hotel (SuperAdmin only)' })
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(id);
  }
}
