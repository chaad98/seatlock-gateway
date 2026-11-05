import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './config/env.schema.js';
import { HealthModule } from './health/health.module.js';
import { ObserveModule } from './observe.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      validationSchema: envSchema,
    }),
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
