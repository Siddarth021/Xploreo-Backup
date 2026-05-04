import { Injectable } from '@nestjs/common';
import { CreateTechadminDto } from './dto/create-techadmin.dto';
import { UpdateTechadminDto } from './dto/update-techadmin.dto';

@Injectable()
export class TechadminService {
  create(createTechadminDto: CreateTechadminDto) {
    return 'This action adds a new techadmin';
  }

  findAll() {
    return `This action returns all techadmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} techadmin`;
  }

  update(id: number, updateTechadminDto: UpdateTechadminDto) {
    return `This action updates a #${id} techadmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} techadmin`;
  }
}
