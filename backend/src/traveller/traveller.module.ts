import { Module } from '@nestjs/common';
import { TravellerService } from './traveller.service';
import { TravellerController } from './traveller.controller';

@Module({
  controllers: [TravellerController],
  providers: [TravellerService],
})
export class TravellerModule {}
