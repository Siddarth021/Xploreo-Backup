import { Injectable, NotFoundException } from '@nestjs/common';
import { TripsRepository } from './trips.repository';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly tripsRepository: TripsRepository) {}

  create(dto: CreateTripDto) {
    return this.tripsRepository.create(dto);
  }

  findAll() {
    return this.tripsRepository.findAll();
  }

  async findOne(id: string) {
    const trip = await this.tripsRepository.findById(id);
    if (!trip) throw new NotFoundException(`Trip ${id} not found`);
    return trip;
  }

  findByTraveller(travellerId: string) {
    return this.tripsRepository.findByTraveller(travellerId);
  }

  findByGuide(guideId: string) {
    return this.tripsRepository.findByGuide(guideId);
  }

  async update(id: string, dto: UpdateTripDto) {
    const updated = await this.tripsRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Trip ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.tripsRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Trip ${id} not found`);
    return { message: `Trip ${id} deleted` };
  }
}
