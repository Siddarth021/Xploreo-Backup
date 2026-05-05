import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleService } from './schedule.service';

@ApiTags('Schedule')
@ApiBearerAuth()
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a schedule item' })
  create(@Body() dto: CreateScheduleDto) {
    return this.scheduleService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedule items' })
  @ApiQuery({ name: 'guideId', required: false })
  findAll(@Query('guideId') guideId?: string) {
    return this.scheduleService.findAll(guideId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get schedule item by ID' })
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a schedule item' })
  update(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
    return this.scheduleService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a schedule item' })
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(Number(id));
  }
}
