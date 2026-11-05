import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { NodeAdapter } from '@nestjs/platform-node';
import request from 'supertest';
import { setupApp } from '../src/app.setup.js';

describe('security baseline', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication(new NodeAdapter());
    setupApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('sends security headers', async () => {
    const res = await request(app.getHttpServer()).get('/health');

    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  it('allows the web app origin', async () => {
    const res = await request(app.getHttpServer())
      .get('/health')
      .set('Origin', 'http://localhost:3000');

    expect(res.headers['access-control-allow-origin']).toBe(
      'http://localhost:3000',
    );
  });

  it('never allows another origin', async () => {
    const res = await request(app.getHttpServer())
      .get('/health')
      .set('Origin', 'https://evil.example');

    expect(res.headers['access-control-allow-origin']).not.toBe(
      'https://evil.example',
    );
  });

  it('returns JSON 404 without a stack trace for unknown routes', async () => {
    const res = await request(app.getHttpServer()).get('/nope');

    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).not.toHaveProperty('stack');
  });
});
