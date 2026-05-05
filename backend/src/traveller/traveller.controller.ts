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
import { TravellerService } from './traveller.service';
import { CreateTravellerDto } from './dto/create-traveller.dto';
import { UpdateTravellerDto } from './dto/update-traveller.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Traveller')
@ApiHeader({ name: 'x-user-id', required: true })
@ApiHeader({ name: 'x-user-role', required: true })
@Controller('traveller')
export class TravellerController {
  constructor(private readonly travellerService: TravellerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a traveller profile' })
  create(@Body() dto: CreateTravellerDto) {
    return this.travellerService.create(dto);
  }

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all travellers (admin only)' })
  findAll() {
    return this.travellerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get traveller by ID' })
  findOne(@Param('id') id: string) {
    return this.travellerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update traveller profile' })
  update(@Param('id') id: string, @Body() dto: UpdateTravellerDto) {
    return this.travellerService.update(id, dto);
  }

  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a traveller (SuperAdmin only)' })
  remove(@Param('id') id: string) {
    return this.travellerService.remove(id);
  }
}
