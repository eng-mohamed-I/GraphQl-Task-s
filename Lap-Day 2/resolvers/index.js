import todosQueries from "./todos/Query.js";
import userQueries from "./users/Query.js";
import userMutation from "./users/Mutation.js";
const resolvers = {
  Query: {
    ...userQueries,
    ...todosQueries,
  },

  Mutation: {
    ...userMutation,
  },
};

export { resolvers };
