import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppStateService } from './app-state.service';

@ApiTags('AppState')
@ApiHeader({ name: 'x-user-id', required: true })
@ApiHeader({ name: 'x-user-role', required: true })
@Controller('app-state')
export class AppStateController {
  constructor(private readonly appStateService: AppStateService) {}

  @Get('bootstrap')
  @ApiOperation({ summary: 'Load the shared frontend app-state payload' })
  getBootstrapState() {
    return this.appStateService.getBootstrapState();
  }

  @Get(':key')
  @ApiOperation({ summary: 'Load a single app-state key' })
  getState(@Param('key') key: string) {
    return this.appStateService.getState(key);
  }

  @Patch(':key')
  @ApiOperation({ summary: 'Update a single app-state key' })
  setState(@Param('key') key: string, @Body('value') value: unknown) {
    return this.appStateService.setState(key, value);
  }
}
