import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('Welcome to Store Api', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
