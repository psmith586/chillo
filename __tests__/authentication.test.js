/**
 * Authentication QA Test
 * 
 * using supertest async endpoint testing to verify login functionality
 */

const app = require('../app')
const supertest = require('supertest')
const request = supertest(app)
const hashTool = require('../config/passport/helpers')

const demoUser = {
  email: 'punisher@mail.sfsu.edu',
  password: 'password1234'
};

const fakeUser = {
  email: 'notinthesystem@mail.com',
  password: 'hacked'
};

const newUser = {
  //uid: req.body.uid,
  first_name: 'Peter',
  last_name: 'Parker',
  email: 'spiderman@mail.sfsu.edu',
  password: hashTool.generateHash('password5678'),
  sfsu_verified: 1,
  permission: 1
};

describe('Register', () => {

  it('succeeds when all fields are correctly input', async () => {
    request
      .post('/api/register')
      .send(newUser)
      .expect(response => {
        response.body.email = newUser.email
      })
      .expect(200);
  });
});

describe('Login', () => {

  it('succeeds with correct credentials', async () => {
    request
      .post('/api/login')
      .send(demoUser)
      .expect(response => {
        response.body.email = demoUser.email
        response.header['location'] = '/dashboard'
      })
      .expect(200);
  });

  it('fails with bad credentials', async () => {
    request
      .post('/api/login')
      .send(fakeUser)
      .expect(303);
  });
});
