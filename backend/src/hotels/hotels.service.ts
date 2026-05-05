import { Injectable, NotFoundException } from '@nestjs/common';
import { HotelsRepository } from './hotels.repository';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(private readonly hotelsRepository: HotelsRepository) {}

  create(dto: CreateHotelDto) {
    return this.hotelsRepository.create({
      hotel_name: dto.hotel_name,
      location: dto.location,
      description: dto.description,
      contact_number: dto.contact_number,
      email: dto.email,
      tax_id: dto.tax_id ?? '',
      bank_account_number: dto.bank_account_number ?? '',
      check_in_time: dto.check_in_time,
      check_out_time: dto.check_out_time,
      cancellation_policy: dto.cancellation_policy ?? '',
    });
  }

  findAll() {
    return this.hotelsRepository.findAll();
  }

  findOne(id: string) {
    const hotel = this.hotelsRepository.findById(id);
    if (!hotel) throw new NotFoundException(`Hotel ${id} not found`);
    return hotel;
  }

  findByLocation(locationId: string) {
    return this.hotelsRepository.findByLocation(locationId);
  }

  update(id: string, dto: UpdateHotelDto) {
    const updated = this.hotelsRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Hotel ${id} not found`);
    return updated;
  }

  remove(id: string) {
    const deleted = this.hotelsRepository.delete(id);
    if (!deleted) throw new NotFoundException(`Hotel ${id} not found`);
    return { message: `Hotel ${id} deleted` };
  }
}
