const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Comment = require('../src/models/commentSchema');

describe('Comment API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a new comment', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createComment(input: { taskId: "1", userId: "1", text: "This is a comment" }) {
              id
              taskId
              userId
              text
            }
          }
        `,
      });
    expect(res.body.data.createComment).to.have.property('id');
  });

  // Add more tests here for update, delete, etc.
});
