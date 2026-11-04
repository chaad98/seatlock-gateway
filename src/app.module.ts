import { Module } from '@nestjs/common';
import { ObserveModule } from './observe.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    // Keys come from OBSERVE_APP_KEY and OBSERVE_APP_SECRET in .env
    // Tests don't report to Observe
    ObserveModule.forRoot({
      serviceId: 'seatlock-gateway',
      enabled: process.env.NODE_ENV !== 'test',
    }),
    HealthModule,
  ],
})
export class AppModule {}
