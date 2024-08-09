const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Label = require('../src/models/labelSchema');

describe('Label API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a new label', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createLabel(input: { name: "Urgent", organizationId: "1" }) {
              id
              name
              organizationId
            }
          }
        `,
      });
    expect(res.body.data.createLabel).to.have.property('id');
  });

  // Add more tests here for update, delete, etc.
});
