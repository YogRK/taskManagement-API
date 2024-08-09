const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');
const authMiddleware = require('./src/middleware/auth');
const rateLimiter = require('./src/middleware/rateLimiter');
const logger = require('./src/utils/logger'); // Correct path
require('dotenv').config();

const app = express();

// Middleware setup
app.use(express.json()); // Parses incoming JSON requests
app.use(authMiddleware); // Authentication middleware
app.use(rateLimiter); // Rate limiting middleware
app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user, // Attach user from auth middleware to context
  }),
});

server.applyMiddleware({ app }); // Integrate Apollo Server with Express

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Start the Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`GraphQL endpoint: ${server.graphqlPath}`);
});
