export const schema = ` #graphql
type Users{ 
    id: Int, 
    name: String,
    email: String, 
    phone: String,
    address: Address
    posts:[Post]
}
type Address {
    street: String,
    city: String,
    geo: Geo
}
type Geo { 
    lat: String, 
    lng: String
}
input userInput { 
    name: String,
    email: String!, 
    phone: String,
    address: addressInput
}
input addressInput {
    street: String,
    city: String,
    geo: geoInput
}
input geoInput { 
    lat: String, 
    lng: String
}

type Post { 
    id: Int,
    title: String,
    body: String,
    userId: Int
    user:Users
    comments:[Comment]
}

input postInput { 
   title: String,
   body: String
   userId: Int

}

type Comment {
    id: Int,
    postId: Int,
    name: String,
    email: String,
    body: String
    post:Post
}

input commentInput {
   postId: Int,
   name: String,
   email: String,
   body: String
}

type Query { 
    users: [Users]
    user(id: Int) :Users
    posts: [Post]
    post(id: Int) :Post
    comments: [Comment]
    comment(id: Int) :Comment
}

type Mutation {
    addUser(user: userInput): Users
    updateUser(id: Int, user: userInput) :Users
    deleteUser(id: Int) : Users

    addPost(post: postInput) : Post
    updatePost(id: Int, post: postInput): Post
    deletePost(id: Int): Post

    addComment(comment: commentInput) :Comment
    updateComment(id: Int, comment: commentInput) : Comment
    deleteComment(id: Int) : Comment
}
`;
