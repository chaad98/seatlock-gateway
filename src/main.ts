import { NestFactory } from '@nestjs/core';
import { NestNodeApplication, NodeAdapter } from '@nestjs/platform-node';
import { AppModule } from './app.module.js';
import { ObserveInstrument } from './observe.js';

async function bootstrap() {
  const app = await NestFactory.create<NestNodeApplication>(
    AppModule,
    new NodeAdapter(),
    { instrument: ObserveInstrument },
  );

  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 4000);
}

await bootstrap();
