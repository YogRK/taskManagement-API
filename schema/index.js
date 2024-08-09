const User = require('../models/userSchema'); // Correct path
const Organization = require('../models/organizationSchema'); // Correct path
const Label = require('../models/labelSchema'); // Correct path
const Comment = require('../models/commentSchema'); // Correct path
const ActivityLog = require('../models/activityLogSchema'); // Correct path

// Replace with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/task_management_db';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Export models
module.exports = {
  User,
  Organization,
  Label,
  Comment,
  ActivityLog,
};
