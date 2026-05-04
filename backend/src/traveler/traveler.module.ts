import { Module } from '@nestjs/common';
import { TravelerController } from './traveler.controller';
import { TravelerService } from './traveler.service';

@Module({
  controllers: [TravelerController],
  providers: [TravelerService]
})
export class TravelerModule {}
