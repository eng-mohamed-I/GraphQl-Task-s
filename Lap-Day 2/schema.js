export const schema = ` #graohql

type Todo {
   _id: ID
   title: String!
   status: String!
}


type User { 
   _id: ID
   username: String!
   email: String!
}

type Query {
   todos: [Todo!]!
   users: [User!]!
   user(id:ID): User
}

input userInput { 
   email: String!
   username: String!
   password: String!
   role: String
}

input loginInput {
   email: String!
   password: String!
}
type loginResponse { 
   email: String
   refreshToken: String
   token: String
}

type Mutation { 
   register(user: userInput): User
   login(user: loginInput): loginResponse
}




`;
