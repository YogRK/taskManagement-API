const Label = require('../src/models/labelSchema');
const Organization = require('../src/models/organizationSchema');

const labelResolver = {
  Query: {
    labels: async () => await Label.find({}),
    label: async (_, { id }) => await Label.findById(id),
  },
  Mutation: {
    createLabel: async (_, { input }) => {
      const label = new Label(input);
      return await label.save();
    },
    updateLabel: async (_, { id, input }) => {
      return await Label.findByIdAndUpdate(id, input, { new: true });
    },
    deleteLabel: async (_, { id }) => {
      return await Label.findByIdAndRemove(id);
    },
  },
  Label: {
    organization: async (label) => await Organization.findById(label.organizationId),
  },
};

module.exports = labelResolver;
