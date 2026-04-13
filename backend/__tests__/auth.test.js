const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Mock external dependencies
jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
}));
jest.mock('bcryptjs');
jest.mock('mongoose');

describe('Auth API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('returns 400 if email or password are missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com' }); // Missing password

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Please provide email and password/);
    });

    it('returns 400 for invalid email format', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'invalid-email', password: 'password123' });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/valid email address/);
    });

    it('returns 401 if user does not exist', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@test.com', password: 'password123' });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toMatch(/Invalid email or password/);
    });

    it('returns 401 if password does not match', async () => {
      const mockUser = {
        _id: 'mockId',
        email: 'test@test.com',
        password: 'hashedPassword',
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'wrongpassword' });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toMatch(/Invalid email or password/);
    });

    it('returns 200 and token if credentials are valid', async () => {
      const mockUser = {
        _id: 'mockId',
        name: 'Test Name',
        email: 'test@test.com',
        password: 'hashedPassword',
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'correctpassword' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.email).toBe('test@test.com');
    });
  });
});
