import { Module } from '@nestjs/common';
import { AppStateController } from './app-state.controller';
import { AppStateService } from './app-state.service';

@Module({
  imports: [],
  controllers: [AppStateController],
  providers: [AppStateService],
  exports: [AppStateService],
})
export class AppStateModule {}
