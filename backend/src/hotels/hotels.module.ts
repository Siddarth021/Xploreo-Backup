import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { HotelsRepository } from './hotels.repository';
import { Hotel } from './entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel])],
  controllers: [HotelsController],
  providers: [HotelsService, HotelsRepository],
  exports: [HotelsRepository],
})
export class HotelsModule {}
