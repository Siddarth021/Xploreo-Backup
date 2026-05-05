import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppStateController } from './app-state.controller';
import { AppStateService } from './app-state.service';
import { AppState } from './entities/app-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppState])],
  controllers: [AppStateController],
  providers: [AppStateService],
  exports: [AppStateService],
})
export class AppStateModule {}
