import { Injectable } from '@nestjs/common';
import { CreateNontechadminDto } from './dto/create-nontechadmin.dto';
import { UpdateNontechadminDto } from './dto/update-nontechadmin.dto';

@Injectable()
export class NontechadminService {
  create(createNontechadminDto: CreateNontechadminDto) {
    return 'This action adds a new nontechadmin';
  }

  findAll() {
    return `This action returns all nontechadmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nontechadmin`;
  }

  update(id: number, updateNontechadminDto: UpdateNontechadminDto) {
    return `This action updates a #${id} nontechadmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} nontechadmin`;
  }
}
