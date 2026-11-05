import { describe, it, expect } from 'vitest';
import { envSchema } from './env.schema.js';

describe('envSchema', () => {
  it('uses safe defaults when nothing is set', () => {
    const result = envSchema.safeParse({});

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      NODE_ENV: 'development',
      HOST: '127.0.0.1',
      PORT: 4000,
      WEB_ORIGIN: 'http://localhost:3000',
    });
  });

  it('turns PORT text into number', () => {
    const result = envSchema.safeParse({ PORT: '4100' });

    expect(result.data?.PORT).toBe(4100);
  });

  it('rejects a PORT that is not a number and names PORT', () => {
    const result = envSchema.safeParse({ PORT: 'abc' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['PORT']);
  });

  it('rejects a WEB_ORIGIN that is not a URL and names WEB_ORIGIN', () => {
    const result = envSchema.safeParse({ WEB_ORIGIN: 'not-a-url' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['WEB_ORIGIN']);
  });
});
