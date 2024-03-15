const request = require('supertest');
const app = require('../../app');
const { httpLoginUser } = require('./auth.controller');

describe('Test POST /auth/login', () => {
  const user = {
    username: 'dergute',
    password: 'ERpraVisbP8+4jZ',
  };

  test('It should respond with 200 success, an an object', () => {
    request(app)
      .post('/auth/login')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200)
  });
});
