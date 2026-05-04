import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NontechadminService } from './nontechadmin.service';
import { CreateNontechadminDto } from './dto/create-nontechadmin.dto';
import { UpdateNontechadminDto } from './dto/update-nontechadmin.dto';

@Controller('nontechadmin')
export class NontechadminController {
  constructor(private readonly nontechadminService: NontechadminService) {}

  @Post()
  create(@Body() createNontechadminDto: CreateNontechadminDto) {
    return this.nontechadminService.create(createNontechadminDto);
  }

  @Get()
  findAll() {
    return this.nontechadminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nontechadminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNontechadminDto: UpdateNontechadminDto) {
    return this.nontechadminService.update(+id, updateNontechadminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nontechadminService.remove(+id);
  }
}
