import { Module } from '@nestjs/common';
import { NontechadminService } from './nontechadmin.service';
import { NontechadminController } from './nontechadmin.controller';

@Module({
  controllers: [NontechadminController],
  providers: [NontechadminService],
})
export class NontechadminModule {}
