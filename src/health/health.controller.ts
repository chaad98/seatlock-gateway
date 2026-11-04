import { Controller, Get } from '@nestjs/common';
import type { HealthStatus } from './health-status.js';

@Controller('health')
export class HealthController {
  @Get()
  check(): HealthStatus {
    return { status: 'ok' };
  }
}
