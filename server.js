const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const auth = require('./src/middleware/auth');
const app = require('./app'); 


//const app = express();

// Connect to MongoDB
connectDB();

// Apply middleware
app.use(express.json());
app.use(auth);

// Set up GraphQL
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ user: req.user }) });
server.applyMiddleware({ app });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
});
