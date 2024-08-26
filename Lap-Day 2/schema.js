export const schema = `#graphql



type Post implements sharedFields {
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
   posts:[Post!]!
   users:[User!]!
   user(id:ID):User
}
type Mutation {
    register(user:userInput):User
    login(user:loginInput):loginResponse

    addPost(post:postInput):Post!
    deletePost(id:ID):String
    updatePost(id:ID, post: updatePostInput):Post!
}

type loginResponse {
   token:String!
   refreshToken:String!
}
    
input updatePostInput {
   title:String
   status:String
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

input postInput {
   title:String!
   status:statusEnum
   userId:ID
}

enum statusEnum {
   Post
   In_progress 
   Done
}




`;
