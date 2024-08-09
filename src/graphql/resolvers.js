const User = require('../models/userSchema');
const Organization = require('../models/organizationSchema');
const Label = require('../models/labelSchema');
const Comment = require('../models/commentSchema');
const ActivityLog = require('../models/activityLogSchema');

// Resolvers here

const resolvers = {
  Query: {
    users: () => User.find().populate('organizationId'),
    user: (_, { id }) => User.findById(id).populate('organizationId'),
    organizations: () => Organization.find(),
    organization: (_, { id }) => Organization.findById(id),
    labels: () => Label.find().populate('organizationId'),
    label: (_, { id }) => Label.findById(id).populate('organizationId'),
    comments: () => Comment.find().populate('taskId userId'),
    comment: (_, { id }) => Comment.findById(id).populate('taskId userId'),
    activityLogs: () => ActivityLog.find().populate('userId'),
    activityLog: (_, { id }) => ActivityLog.findById(id).populate('userId'),
  },
  Mutation: {
    createUser: (_, args) => new User(args).save(),
    updateUser: (_, { id, ...args }) => User.findByIdAndUpdate(id, args, { new: true }),
    deleteUser: (_, { id }) => User.findByIdAndDelete(id).then(() => 'User deleted'),
    createOrganization: (_, args) => new Organization(args).save(),
    updateOrganization: (_, { id, ...args }) => Organization.findByIdAndUpdate(id, args, { new: true }),
    deleteOrganization: (_, { id }) => Organization.findByIdAndDelete(id).then(() => 'Organization deleted'),
    createLabel: (_, args) => new Label(args).save(),
    updateLabel: (_, { id, ...args }) => Label.findByIdAndUpdate(id, args, { new: true }),
    deleteLabel: (_, { id }) => Label.findByIdAndDelete(id).then(() => 'Label deleted'),
    createComment: (_, args) => new Comment(args).save(),
    updateComment: (_, { id, ...args }) => Comment.findByIdAndUpdate(id, args, { new: true }),
    deleteComment: (_, { id }) => Comment.findByIdAndDelete(id).then(() => 'Comment deleted'),
    createActivityLog: (_, args) => new ActivityLog(args).save(),
    updateActivityLog: (_, { id, ...args }) => ActivityLog.findByIdAndUpdate(id, args, { new: true }),
    deleteActivityLog: (_, { id }) => ActivityLog.findByIdAndDelete(id).then(() => 'ActivityLog deleted'),
  },
};

module.exports = resolvers;
