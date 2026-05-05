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
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Guide')
@ApiHeader({ name: 'x-user-id', required: true })
@ApiHeader({ name: 'x-user-role', required: true })
@Controller('guide')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a guide profile' })
  create(@Body() dto: CreateGuideDto) {
    return this.guideService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all guides' })
  findAll() {
    return this.guideService.findAll();
  }

  @Get('location/:locationId')
  @ApiOperation({ summary: 'Get guides by location' })
  findByLocation(@Param('locationId') locationId: string) {
    return this.guideService.findByLocation(locationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get guide by ID' })
  findOne(@Param('id') id: string) {
    return this.guideService.findOne(id);
  }

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN, Role.GUIDE)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a guide profile' })
  update(@Param('id') id: string, @Body() dto: UpdateGuideDto) {
    return this.guideService.update(id, dto);
  }

  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a guide' })
  remove(@Param('id') id: string) {
    return this.guideService.remove(id);
  }
}
