const { mergeResolvers } = require('@graphql-tools/merge');

const userResolver = require('./userResolver');
const organizationResolver = require('./organizationResolver');
const labelResolver = require('./labelResolver');
const commentResolver = require('./commentResolver');
const activityLogResolver = require('./activityLogResolver');

const resolvers = mergeResolvers([
  userResolver,
  organizationResolver,
  labelResolver,
  commentResolver,
  activityLogResolver,
]);

module.exports = resolvers;
