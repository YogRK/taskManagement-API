const ActivityLog = require('../src/models/activityLogSchema');
const Task = require('../src/models/taskSchema');
const User = require('../src/models/userSchema');

const activityLogResolver = {
  Query: {
    activityLogs: async () => await ActivityLog.find({}),
    activityLog: async (_, { id }) => await ActivityLog.findById(id),
  },
  Mutation: {
    createActivityLog: async (_, { input }) => {
      const activityLog = new ActivityLog(input);
      return await activityLog.save();
    },
    updateActivityLog: async (_, { id, input }) => {
      return await ActivityLog.findByIdAndUpdate(id, input, { new: true });
    },
    deleteActivityLog: async (_, { id }) => {
      return await ActivityLog.findByIdAndRemove(id);
    },
  },
  ActivityLog: {
    task: async (activityLog) => await Task.findById(activityLog.taskId),
    user: async (activityLog) => await User.findById(activityLog.userId),
  },
};

module.exports = activityLogResolver;
