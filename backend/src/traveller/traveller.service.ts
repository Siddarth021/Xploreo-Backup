import { Injectable } from '@nestjs/common';
import { CreateTravellerDto } from './dto/create-traveller.dto';
import { UpdateTravellerDto } from './dto/update-traveller.dto';

@Injectable()
export class TravellerService {
  create(createTravellerDto: CreateTravellerDto) {
    return 'This action adds a new traveller';
  }

  findAll() {
    return `This action returns all traveller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} traveller`;
  }

  update(id: number, updateTravellerDto: UpdateTravellerDto) {
    return `This action updates a #${id} traveller`;
  }

  remove(id: number) {
    return `This action removes a #${id} traveller`;
  }
}
