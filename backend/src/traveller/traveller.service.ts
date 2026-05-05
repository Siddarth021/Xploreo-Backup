import { Injectable, NotFoundException } from '@nestjs/common';
import { TravellerRepository } from './traveller.repository';
import { CreateTravellerDto } from './dto/create-traveller.dto';
import { UpdateTravellerDto } from './dto/update-traveller.dto';

@Injectable()
export class TravellerService {
  constructor(private readonly travellerRepository: TravellerRepository) {}

  create(dto: CreateTravellerDto) {
    return this.travellerRepository.create({
      fname: dto.fname,
      lname: dto.lname,
      email: dto.email,
      phno: dto.phno,
      plang: dto.plang ?? [],
      bio: dto.bio ?? '',
      interests: dto.interests ?? [],
    });
  }

  findAll() {
    return this.travellerRepository.findAll();
  }

  findOne(id: string) {
    const t = this.travellerRepository.findById(id);
    if (!t) throw new NotFoundException(`Traveller ${id} not found`);
    return t;
  }

  update(id: string, dto: UpdateTravellerDto) {
    const updated = this.travellerRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Traveller ${id} not found`);
    return updated;
  }

  remove(id: string) {
    const deleted = this.travellerRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Traveller ${id} not found`);
    return { message: `Traveller ${id} deleted` };
  }
}
