import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { loadDefaultAppState } from './default-app-state.seed';

@Injectable()
export class AppStateService implements OnModuleInit {
  private state: Map<string, unknown> = new Map();

  async onModuleInit() {
    if (this.state.size > 0) return;

    const defaults = await loadDefaultAppState();
    for (const [key, value] of Object.entries(defaults)) {
      this.state.set(key, value);
    }
  }

  getBootstrapState(): Record<string, unknown> {
    return Object.fromEntries(this.state.entries());
  }

  getState(key: string): unknown {
    if (!this.state.has(key)) {
      throw new NotFoundException(`App state "${key}" not found`);
    }
    return this.state.get(key);
  }

  setState(key: string, value: unknown): unknown {
    this.state.set(key, value);
    return value;
  }
}
