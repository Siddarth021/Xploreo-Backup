import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TripsRepository } from './trips.repository';

@Module({
  imports: [],
  controllers: [TripsController],
  providers: [TripsService, TripsRepository],
  exports: [TripsRepository],
})
export class TripsModule {}
