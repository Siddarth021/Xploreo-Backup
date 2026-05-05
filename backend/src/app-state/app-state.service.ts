import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppStateService {
  private state: Map<string, unknown> = new Map();

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
