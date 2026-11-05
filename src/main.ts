import { NestFactory } from '@nestjs/core';
import { NestNodeApplication, NodeAdapter } from '@nestjs/platform-node';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module.js';
import { ObserveInstrument } from './observe.js';
import type { Env } from './config/env.schema.js';

async function bootstrap() {
  const app = await NestFactory.create<NestNodeApplication>(
    AppModule,
    new NodeAdapter(),
    { instrument: ObserveInstrument },
  );

  const config = app.get<ConfigService<Env, true>>(ConfigService);
  const port = config.get('PORT', { infer: true });
  const host = config.get('HOST', { infer: true });

  app.enableShutdownHooks();
  await app.listen(port, host);
}

await bootstrap();
