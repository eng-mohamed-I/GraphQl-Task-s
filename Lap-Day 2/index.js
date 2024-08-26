import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers/index.js";
import dotenv from "dotenv";
import Util from "util";
import jwt from "jsonwebtoken";

const port = 3000;

//secret keys
dotenv.config();

//create database
mongoose
  .connect("mongodb://127.0.0.1:27017/day2-Graphql")
  .then(() => {
    console.log("db Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//create server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  formatError: (err) => {
    return { message: err.message };
  },
});

// start server
startStandaloneServer(server, {
  listen: { port: port },
  context: async ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      try {
        let decoded = await Util.promisify(jwt.verify)(
          authorization,
          process.env.TOKENSECRET
        );
        return { user: decoded };
      } catch (err) {
        throw new Error("you are not authenticated", err);
      }
    } else {
      return {};
    }
  },
})
  .then(() => {
    console.log("server connected");
  })
  .catch((err) => {
    console.log(err);
  });
