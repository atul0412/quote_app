require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const http = require("http");
const cors = require("cors");
const typeDefs = require("./graphQL/Schema");
const resolvers = require("./graphQL/resolver");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");

const app = express();
const httpServer = http.createServer(app);

// connecting MoangoDB

connectDB();

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
    expressMiddleware(server, {  context: ({ req }) => {
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1]; // "Bearer <token>"
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return { userId: payload.userId }; // ✅ Must match resolvers
      } catch (err) {
        console.error("JWT Error:", err.message);
      }
    }
    return {}; // No userId
  },
    })
  );

  const PORT = process.env.PORT || 8000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
