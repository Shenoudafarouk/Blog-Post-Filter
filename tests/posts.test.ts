// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');
import app from '../src/app';

describe('GET /api/posts', () => {
  describe('when tags query string is missing', () => {
    test('should return with 400 as status code', async () => {
      const response = await request(app).get('/api/posts');
      expect(response.statusCode).toBe(400);
    });

    test('should has the error message in the response', async () => {
      const response = await request(app).get('/api/posts');
      expect(response.body).toHaveProperty('error', 'tags parameter is required');
    });
  });

  describe('when sortBy query string has an invalid value', () => {
    test('should return with 400 as status code', async () => {
      const response = await request(app).get('/api/posts?tags=tech&sortBy=bar');
      expect(response.statusCode).toBe(400);
    });

    test('should has the error message in the response', async () => {
      const response = await request(app).get('/api/posts?tags=tech&sortBy=bar');
      expect(response.body).toHaveProperty('error', 'sortBy parameter is invalid');
    });
  });

  describe('when direction query string has an invalid value', () => {
    test('should return with 400 as status code', async () => {
      const response = await request(app).get('/api/posts?tags=tech&direction=bar');
      expect(response.statusCode).toBe(400);
    });

    test('should has the error message in the response', async () => {
      const response = await request(app).get('/api/posts?tags=tech&direction=bar');
      expect(response.body).toHaveProperty('error', 'direction parameter is invalid');
    });
  });
});
