const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const cors = require('cors');
const { Quotes, Users } = require('./fakeDB');


// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    users:[User]
    quote:[Quote] 
  }
    type User {
    id: ID!
    name: String
    email: String
    }
    type Quote {
    text:String,
    by:ID!
}
`

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    users:()=> Users,
    quote:()=> Quotes
  },
};

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  await server.start();

  app.use(
    cors(),
    express.json(),
    expressMiddleware(server),
  );

  await new Promise((resolve) => httpServer.listen({ port: 8000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:8000`);
}

startServer();