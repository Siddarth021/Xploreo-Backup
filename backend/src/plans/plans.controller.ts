import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/entities/auth.entity';

@ApiTags('Plans')
@ApiHeader({ name: 'x-user-id', required: true })
@ApiHeader({ name: 'x-user-role', required: true })
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a trip plan' })
  create(@Body() dto: CreatePlanDto) {
    return this.plansService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all plans with optional pagination & filtering' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'destination', required: false })
  @ApiQuery({ name: 'availability', required: false })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('destination') destination?: string,
  ) {
    return this.plansService.findAll({ page, limit, destination });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get plan by ID' })
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @Roles(Role.SUPERADMIN, Role.NONTECHADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a plan' })
  update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    return this.plansService.update(id, dto);
  }

  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a plan' })
  remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }
}
