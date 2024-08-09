const User = require('../src/models/userSchema');
const Organization = require('../src/models/organizationSchema');

const userResolver = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = new User(input);
      return await user.save();
    },
    updateUser: async (_, { id, input }) => {
      return await User.findByIdAndUpdate(id, input, { new: true });
    },
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndRemove(id);
    },
  },
  User: {
    organization: async (user) => await Organization.findById(user.organizationId),
  },
};

module.exports = userResolver;
