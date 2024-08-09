const Comment = require('../src/models/commentSchema');
const Task = require('../src/models/taskSchema');
const User = require('../src/models/userSchema');

const commentResolver = {
  Query: {
    comments: async () => await Comment.find({}),
    comment: async (_, { id }) => await Comment.findById(id),
  },
  Mutation: {
    createComment: async (_, { input }) => {
      const comment = new Comment(input);
      return await comment.save();
    },
    updateComment: async (_, { id, input }) => {
      return await Comment.findByIdAndUpdate(id, input, { new: true });
    },
    deleteComment: async (_, { id }) => {
      return await Comment.findByIdAndRemove(id);
    },
  },
  Comment: {
    task: async (comment) => await Task.findById(comment.taskId),
    user: async (comment) => await User.findById(comment.userId),
  },
};

module.exports = commentResolver;
