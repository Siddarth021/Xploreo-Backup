import { Module } from '@nestjs/common';
import { TechadminService } from './techadmin.service';
import { TechadminController } from './techadmin.controller';

@Module({
  controllers: [TechadminController],
  providers: [TechadminService],
})
export class TechadminModule {}
