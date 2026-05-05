import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { HotelsRepository } from './hotels.repository';

@Module({
  imports: [],
  controllers: [HotelsController],
  providers: [HotelsService, HotelsRepository],
  exports: [HotelsRepository],
})
export class HotelsModule {}
