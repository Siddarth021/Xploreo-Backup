import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechadminService } from './techadmin.service';
import { CreateTechadminDto } from './dto/create-techadmin.dto';
import { UpdateTechadminDto } from './dto/update-techadmin.dto';

@Controller('techadmin')
export class TechadminController {
  constructor(private readonly techadminService: TechadminService) {}

  @Post()
  create(@Body() createTechadminDto: CreateTechadminDto) {
    return this.techadminService.create(createTechadminDto);
  }

  @Get()
  findAll() {
    return this.techadminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techadminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechadminDto: UpdateTechadminDto) {
    return this.techadminService.update(+id, updateTechadminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.techadminService.remove(+id);
  }
}
