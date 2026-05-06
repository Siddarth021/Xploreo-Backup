import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/entities/auth.entity';
import {
  ApiCreateEndpoint,
  ApiProtectedResource,
  ApiReadEndpoint,
} from '../common/decorators/api-docs.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateExperienceBookingDto } from './dto/create-experience-booking.dto';
import { ExperienceBookingsService } from './experience-bookings.service';

@ApiTags('Phase 2 - Experience Bookings')
@ApiProtectedResource()
@Controller('experience-bookings')
export class ExperienceBookingsController {
  constructor(
    private readonly experienceBookingsService: ExperienceBookingsService,
  ) {}

  @Post()
  @Roles(Role.TRAVELLER_ACTOR)
  @ApiOperation({ summary: 'Traveller books an experience' })
  @ApiCreateEndpoint(CreateExperienceBookingDto)
  create(@Body() dto: CreateExperienceBookingDto, @Req() req: any) {
    return this.experienceBookingsService.create(req.user?.userId, dto);
  }

  @Get()
  @Roles(Role.TRAVELLER_ACTOR, Role.ADMIN, Role.EXPERIENCE_PARTNER)
  @ApiOperation({ summary: 'View experience bookings' })
  @ApiReadEndpoint()
  findAll(@Req() req: any) {
    if (req.user?.role === Role.TRAVELLER_ACTOR) {
      return this.experienceBookingsService.findForTraveller(req.user?.userId);
    }
    if (req.user?.role === Role.EXPERIENCE_PARTNER) {
      return this.experienceBookingsService.findForPartner(req.user?.userId);
    }

    return this.experienceBookingsService.findAll();
  }
}
