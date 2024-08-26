import { postQueries } from "./posts/Query.js";
import { userQueries } from "./users/Query.js";
import userMutations from "./users/Mutation.js";
import postMutations from "./posts/Mutation.js";
import userModel from "../models/user.js";
export const resolvers = {
  Query: {
    ...postQueries,
    ...userQueries,
  },

  Mutation: {
    ...userMutations,
    ...postMutations,
  },
  //relations
  Post: {
    async user(parent) {
      return await userModel.findById(parent.userId);
    },
  },
};
