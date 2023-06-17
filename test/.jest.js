const request = require('supertest');
const app = require('../app'); // Ganti dengan path ke file app.js atau server Anda

describe('GET /dashboard', () => {
  it('should return dashboard page', async () => {
    const response = await request(app).get('/dashboard');

    expect(response.statusCode).toBe(200);
    // Lakukan asser lainnya sesuai dengan respons yang diharapkan dari rute /dashboard
  });
});