const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    role: String!
    organizationId: Organization
  }

  type Organization {
    id: ID!
    name: String!
  }

  type Label {
    id: ID!
    name: String!
    organizationId: Organization
  }

  type Comment {
    id: ID!
    text: String!
    taskId: Task
    userId: User
  }

  type ActivityLog {
    id: ID!
    action: String!
    userId: User
    timestamp: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    organizations: [Organization]
    organization(id: ID!): Organization
    labels: [Label]
    label(id: ID!): Label
    comments: [Comment]
    comment(id: ID!): Comment
    activityLogs: [ActivityLog]
    activityLog(id: ID!): ActivityLog
  }

  type Mutation {
    createUser(username: String!, password: String!, role: String!, organizationId: ID): User
    updateUser(id: ID!, username: String, password: String, role: String, organizationId: ID): User
    deleteUser(id: ID!): String
    createOrganization(name: String!): Organization
    updateOrganization(id: ID!, name: String!): Organization
    deleteOrganization(id: ID!): String
    createLabel(name: String!, organizationId: ID!): Label
    updateLabel(id: ID!, name: String): Label
    deleteLabel(id: ID!): String
    createComment(text: String!, taskId: ID!, userId: ID!): Comment
    updateComment(id: ID!, text: String): Comment
    deleteComment(id: ID!): String
    createActivityLog(action: String!, userId: ID!): ActivityLog
    updateActivityLog(id: ID!, action: String): ActivityLog
    deleteActivityLog(id: ID!): String
  }
`;

module.exports = typeDefs;
