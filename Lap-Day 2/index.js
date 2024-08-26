import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers/index.js";

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/day2-Gaphql")
  .then((res) => console.log("db connected"))
  .catch((err) => console.log(err));

//create apollo server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

startStandaloneServer(server, {
  listen: {
    port: 3000,
  },
})
  .then(() => console.log("server started successfully"))
  .catch((err) => console.log(err));
