import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravellerService } from './traveller.service';
import { CreateTravellerDto } from './dto/create-traveller.dto';
import { UpdateTravellerDto } from './dto/update-traveller.dto';

@Controller('traveller')
export class TravellerController {
  constructor(private readonly travellerService: TravellerService) {}

  @Post()
  create(@Body() createTravellerDto: CreateTravellerDto) {
    return this.travellerService.create(createTravellerDto);
  }

  @Get()
  findAll() {
    return this.travellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travellerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravellerDto: UpdateTravellerDto) {
    return this.travellerService.update(+id, updateTravellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travellerService.remove(+id);
  }
}
