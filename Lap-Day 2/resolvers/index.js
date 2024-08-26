import { userQueries } from "./users/Query.js";
import userMutations from "./users/Mutation.js";
import userModel from "../models/user.js";
import todoMutations from "./todos/Mutation.js";
import { todoQueries } from "./todos/Query.js";
export const resolvers = {
  Query: {
    ...todoQueries,
    ...userQueries,
  },

  Mutation: {
    ...userMutations,
    ...todoMutations,
  },
  //relations
  Todo: {
    async user(parent) {
      return await userModel.findById(parent.userId);
    },
  },
};
