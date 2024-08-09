const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Organization = require('../src/models/organizationSchema');

describe('Organization API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a new organization', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createOrganization(input: { name: "Acme Inc." }) {
              id
              name
            }
          }
        `,
      });
    expect(res.body.data.createOrganization).to.have.property('id');
  });

  // Add more tests here for update, delete, etc.
});
