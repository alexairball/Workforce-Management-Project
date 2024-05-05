import { Query } from "../queries/query.js";
import { Mutation } from "../mutation/mutation.js";
import { PriorityEnum } from "../GraphQLTypes/PriorityEnum.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { createDbConnection } from "../database/_db.js";

const typeDefs = `#graphql
  scalar Priority

  type WorkOrder {
    id: ID!
    title: String!
    description: String
    dueDate: String!
    priority: Priority!
  }

  type Query {
    getWorkOrders: [WorkOrder]
  }

  input Order {
    title: String!
    description: String
    dueDate: String!
    priority: Priority!
  }

  type Mutation {
     addWorkOrder(newOrder: Order): WorkOrder
  }
`;

const resolvers = {
  Priority: PriorityEnum,
  Query,
  Mutation,
};

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await createDbConnection();
await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
