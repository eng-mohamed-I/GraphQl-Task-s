export const schema = `#graphql



type Todo implements sharedFields {
   _id:ID
   title:String!
   status:String!
   user:User
}
interface sharedFields {
   _id:ID
}

type User{
   _id:ID
   userName:String!
   email:String!
}

type Query {
   todos:[Todo!]!
   users:[User!]!
   user(id:ID):User
}
type Mutation {
    register(user:userInput):User
    login(user:loginInput):loginResponse
    updateUser(user:loginInput , update:updateInput):String
    deleteUser(id:ID):String

    addTodo(todo:todoInput):Todo!
    deleteTodo(id:ID):String
    updateTodo(id:ID, post: updateTodoInput):Todo!
}

type loginResponse {
   token:String!
   refreshToken:String!
}
    
input updateTodoInput {
   title:String
   status:String
}
input updateInput {
   newemail:String!
}

input loginInput {
   email:String!
   password:String!
}
    
input userInput {
   userName:String!
   email:String!
   password:String!
   role:String
}

input todoInput {
   title:String!
   status:statusEnum
   userId:ID
}

enum statusEnum {
   Todo
   In_progress 
   Done
}




`;
