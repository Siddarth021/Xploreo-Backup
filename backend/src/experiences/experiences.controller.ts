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
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Experiences')
@ApiHeader({ name: 'x-user-id', required: true })
@ApiHeader({ name: 'x-user-role', required: true })
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN, Role.EXPERIENCE)
  @Post()
  @ApiOperation({ summary: 'Create an experience' })
  create(@Body() dto: CreateExperienceDto) {
    return this.experiencesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experiences' })
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get('location/:locationId')
  @ApiOperation({ summary: 'Get experiences by location' })
  findByLocation(@Param('locationId') locationId: string) {
    return this.experiencesService.findByLocation(locationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get experience by ID' })
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id);
  }

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN, Role.EXPERIENCE)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an experience' })
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experiencesService.update(id, dto);
  }

  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an experience' })
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id);
  }
}
