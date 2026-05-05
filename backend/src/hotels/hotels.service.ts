import { Injectable, NotFoundException } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  create(dto: CreateHotelDto) {
    return this.hotelsRepository.create({
      ...dto,
      taxesAndFees: dto.taxesAndFees ?? 0,
      status: dto.status ?? 'active',
    });
  }

  findAll() {
    return this.hotelsRepository.findAll();
  }

  async findOne(id: string) {
    const hotel = await this.hotelsRepository.findById(id);
    if (!hotel) throw new NotFoundException(`Hotel ${id} not found`);
    return hotel;
  }

  findByLocation(locationId: string) {
    return this.hotelsRepository.findByLocation(locationId);
  }

  async update(id: string, dto: UpdateHotelDto) {
    const updated = await this.hotelsRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Hotel ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.hotelsRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Hotel ${id} not found`);
    return { message: `Hotel ${id} deleted` };
  }
}
