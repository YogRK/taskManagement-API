const Task = require('../src/models/Task');
const User = require('../src/models/User');

const taskResolver = {
  Query: {
    tasksByStatus: async (_, { status }) => {
      return await Task.find({ status });
    },
    tasksByPriority: async (_, { priority }) => {
      return await Task.find({ priority });
    },
    overdueTasks: async () => {
      const today = new Date();
      return await Task.find({ dueDate: { $lt: today }, status: { $ne: 'Completed' } });
    },
  },

  Mutation: {
    createTask: async (_, args) => {
      const task = new Task({ ...args });
      return await task.save();
    },
    addLabelToTask: async (_, { taskId, labelId }) => {
      return await Task.findByIdAndUpdate(taskId, { $push: { labels: labelId } }, { new: true });
    },
    addTaskDependency: async (_, { taskId, dependencyId }) => {
      return await Task.findByIdAndUpdate(taskId, { $push: { dependsOn: dependencyId } }, { new: true });
    },
  },
};

module.exports = taskResolver;
