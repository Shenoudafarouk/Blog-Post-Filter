// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');
import app from '../src/app';

describe('GET /api/ping', () => {
  test('should return with success', async () => {
    const response = await request(app).get('/api/ping');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });
});
