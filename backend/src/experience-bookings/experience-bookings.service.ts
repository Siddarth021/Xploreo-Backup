import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExperienceAvailability } from '../experiences/entities/experience.entity';
import { ExperiencesRepository } from '../experiences/experiences.repository';
import { CreateExperienceBookingDto } from './dto/create-experience-booking.dto';
import { ExperienceBookingsRepository } from './experience-bookings.repository';

@Injectable()
export class ExperienceBookingsService {
  constructor(
    private readonly bookingsRepository: ExperienceBookingsRepository,
    private readonly experiencesRepository: ExperiencesRepository,
  ) {}

  create(travellerId: string | undefined, dto: CreateExperienceBookingDto) {
    if (!travellerId) {
      throw new ForbiddenException(
        'x-user-id header is required for TRAVELLER',
      );
    }

    const experience = this.experiencesRepository.findById(dto.experienceId);
    if (!experience) {
      throw new NotFoundException(`Experience ${dto.experienceId} not found`);
    }
    if (experience.availability !== ExperienceAvailability.AVAILABLE) {
      throw new BadRequestException('Experience is not available for booking');
    }
    if (experience.booked + dto.participants > experience.capacity) {
      throw new BadRequestException('Experience capacity exceeded');
    }

    let updatedSlots = experience.slots;
    if (dto.slotId) {
      const slotIndex = experience.slots.findIndex((s) => s.id === dto.slotId);
      if (slotIndex !== -1) {
        const slot = experience.slots[slotIndex];
        if (slot.booked + dto.participants > slot.capacity) {
          throw new BadRequestException('Slot capacity exceeded');
        }
        updatedSlots = [...experience.slots];
        updatedSlots[slotIndex] = {
          ...slot,
          booked: slot.booked + dto.participants,
          available: slot.booked + dto.participants < slot.capacity,
        };
      }
    }

    const updated = this.experiencesRepository.update(experience.id, {
      booked: experience.booked + dto.participants,
      availability:
        experience.booked + dto.participants >= experience.capacity
          ? ExperienceAvailability.NOT_AVAILABLE
          : ExperienceAvailability.AVAILABLE,
      slots: updatedSlots,
    });

    const booking = this.bookingsRepository.create({
      experienceId: experience.id,
      travellerId,
      guestName: dto.guestName,
      email: dto.email,
      phone: dto.phone,
      date: dto.date,
      time: dto.time,
      slotId: dto.slotId,
      participants: dto.participants,
      totalAmount: experience.price * dto.participants,
    });

    return {
      ...booking,
      experience: updated ?? experience,
    };
  }

  findAll() {
    return this.bookingsRepository.findAll().map((booking) => ({
      ...booking,
      experience: this.experiencesRepository.findById(booking.experienceId),
    }));
  }

  findForTraveller(travellerId: string | undefined) {
    if (!travellerId) {
      throw new ForbiddenException(
        'x-user-id header is required for TRAVELLER',
      );
    }

    return this.bookingsRepository
      .findByTravellerId(travellerId)
      .map((booking) => ({
        ...booking,
        experience: this.experiencesRepository.findById(booking.experienceId),
      }));
  }

  findForPartner(partnerId: string | undefined) {
    if (!partnerId) {
      throw new ForbiddenException(
        'x-user-id header is required for EXPERIENCE_PARTNER',
      );
    }

    const partnerExperiences =
      this.experiencesRepository.findByPartnerId(partnerId);
    const experienceById = new Map(
      partnerExperiences.map((experience) => [experience.id, experience]),
    );

    return this.bookingsRepository
      .findByExperienceIds(
        partnerExperiences.map((experience) => experience.id),
      )
      .map((booking) => ({
        ...booking,
        experience: experienceById.get(booking.experienceId),
      }));
  }
}
