const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../src/models/userSchema');

describe('User API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createUser(input: { username: "john_doe", password: "password123", role: "User", organizationId: "1" }) {
              id
              username
              role
            }
          }
        `,
      });
    expect(res.body.data.createUser).to.have.property('id');
  });

  // Add more tests here for update, delete, etc.
});
