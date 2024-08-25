import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";

//Create Server

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

startStandaloneServer(server, {
  listen: {
    port: 3000,
  },
})
  .then(() => console.log("server started"))
  .catch((err) => {
    console.log(err);
  });
