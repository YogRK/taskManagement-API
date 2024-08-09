const Organization = require('../src/models/organizationSchema');

const organizationResolver = {
  Query: {
    organizations: async () => await Organization.find({}),
    organization: async (_, { id }) => await Organization.findById(id),
  },
  Mutation: {
    createOrganization: async (_, { input }) => {
      const organization = new Organization(input);
      return await organization.save();
    },
    updateOrganization: async (_, { id, input }) => {
      return await Organization.findByIdAndUpdate(id, input, { new: true });
    },
    deleteOrganization: async (_, { id }) => {
      return await Organization.findByIdAndRemove(id);
    },
  },
};

module.exports = organizationResolver;
