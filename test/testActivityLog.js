const request = require('supertest');
const app = require('../app'); // Replace with the path to your Express app
const mongoose = require('mongoose');
const ActivityLog = require('../src/models/activityLogSchema'); // Replace with the correct path

describe('ActivityLog API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI); // Replace with your MongoDB URI
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a new activity log', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createActivityLog(input: { taskId: "1", userId: "1", action: "created", timestamp: "2024-08-09T00:00:00Z" }) {
              id
              taskId
              userId
              action
              timestamp
            }
          }
        `,
      });
    expect(res.body.data.createActivityLog).to.have.property('id');
  });

  // Add more tests here for update, delete, etc.
});
