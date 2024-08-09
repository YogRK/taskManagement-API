const { gql } = require('apollo-server-express');

const taskSchema = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    dueDate: String
    userId: ID!
    organizationId: ID!
    assignedTo: User
    priority: String
    labels: [Label!]
    dependsOn: [Task!]
  }

  extend type Query {
    tasksByStatus(status: String!): [Task!]
    tasksByPriority(priority: String!): [Task!]
    overdueTasks: [Task!]
  }

  extend type Mutation {
    createTask(
      title: String!,
      description: String,
      status: String,
      dueDate: String,
      userId: ID!,
      organizationId: ID!,
      assignedTo: ID,
      priority: String,
      labels: [ID],
      dependsOn: [ID]
    ): Task!

    addLabelToTask(taskId: ID!, labelId: ID!): Task!
    addTaskDependency(taskId: ID!, dependencyId: ID!): Task!
  }
`;

module.exports = taskSchema;
