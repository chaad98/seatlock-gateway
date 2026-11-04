import { Module } from '@nestjs/common';
import { ObserveModule } from './observe.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    // Keys come from OBSERVE_APP_KEY and OBSERVE_APP_SECRET in .env
    // Tests dont't report to Observe
    ObserveModule.forRoot({
      serviceId: 'seatlock-gateway',
      enabled: process.env.NODE_ENV !== 'test',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
