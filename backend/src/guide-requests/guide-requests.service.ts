import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { TripsService } from '../trips/trips.service';
import { CreateGuideRequestDto } from './dto/create-guide-request.dto';
import { UpdateGuideRequestDto } from './dto/update-guide-request.dto';
import { GuideRequestStatus } from './entities/guide-request.entity';
import { GuideRequestsRepository } from './guide-requests.repository';

@Injectable()
export class GuideRequestsService {
  constructor(
    private readonly repository: GuideRequestsRepository,
    private readonly tripsService: TripsService,
  ) {}

  create(dto: CreateGuideRequestDto) {
    const trip = this.tripsService.findOne(dto.tripId);

    if (trip.travellerId !== dto.travellerId) {
      throw new BadRequestException('Traveller does not own this trip');
    }

    if (!this.tripsService.experienceExistsOnTrip(dto.tripId, dto.experienceId)) {
      throw new BadRequestException('Experience is not part of this trip itinerary');
    }

    if (
      this.repository.findOpenDuplicate(
        dto.travellerId,
        dto.tripId,
        dto.experienceId,
      )
    ) {
      throw new BadRequestException('An open guide request already exists');
    }

    return this.repository.create({
      travellerId: dto.travellerId,
      tripId: dto.tripId,
      experienceId: dto.experienceId,
      status: GuideRequestStatus.PENDING,
    });
  }

  findByGuide(guideId: string) {
    return this.repository.findByGuide(guideId);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    const request = this.repository.findById(id);
    if (!request) throw new NotFoundException(`Guide request ${id} not found`);
    return request;
  }

  findByTraveller(travellerId: string) {
    return this.repository.findByTraveller(travellerId);
  }

  update(id: string, dto: UpdateGuideRequestDto, actor?: { userId?: string; role?: string }) {
    const request = this.findOne(id);

    if (!dto.status && !dto.guideId) {
      throw new BadRequestException('At least one guide request field is required');
    }

    const nextGuideId = dto.guideId || actor?.userId;
    if (dto.status === GuideRequestStatus.ACCEPTED) {
      if (request.status !== GuideRequestStatus.PENDING) {
        throw new BadRequestException('Only pending guide requests can be accepted');
      }

      if (!nextGuideId) {
        throw new BadRequestException('guideId is required to accept a request');
      }

      if (actor?.role === 'guide' && actor.userId !== nextGuideId) {
        throw new ForbiddenException('Guide can only accept requests for their own account');
      }

      if (request.guideId && request.guideId !== nextGuideId) {
        throw new ForbiddenException('Guide request is assigned to another guide');
      }
    }

    const updated = this.repository.update(id, {
      status: dto.status ?? request.status,
      guideId: nextGuideId ?? request.guideId,
    });

    if (!updated) throw new NotFoundException(`Guide request ${id} not found`);

    if (updated.status === GuideRequestStatus.ACCEPTED && updated.guideId) {
      this.tripsService.assignGuide(updated.tripId, updated.guideId);
    }

    return updated;
  }

  remove(id: string) {
    const deleted = this.repository.delete(id);
    if (!deleted) throw new NotFoundException(`Guide request ${id} not found`);
    return { message: `Guide request ${id} deleted` };
  }
}
