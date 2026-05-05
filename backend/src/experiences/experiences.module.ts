import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesRepository } from './experiences.repository';
import { Experience } from './entities/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  controllers: [ExperiencesController],
  providers: [ExperiencesService, ExperiencesRepository],
  exports: [ExperiencesRepository],
})
export class ExperiencesModule {}
