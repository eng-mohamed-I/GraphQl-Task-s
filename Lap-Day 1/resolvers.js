import { posts, users, comments } from "./_db.js";

export const resolvers = {
  Query: {
    users() {
      return users;
    },
    user(_, { id }) {
      return users.find((user) => user.id == id);
    },
    posts() {
      return posts;
    },
    post(_, { id }) {
      return posts.find((post) => post.id == id);
    },
    comments() {
      return comments;
    },
    comment(_, { id }) {
      return comments.find((comment) => comment.id == id);
    },
  },
  Mutation: {
    addUser(_, { user }) {
      let newUser = { ...user, id: users[users.length - 1].id + 1 };
      users.push(newUser);
      return newUser;
    },
    updateUser(_, { id, user }) {
      let foundedUser = users.find((user) => id == user.id);
      foundedUser.name = user.name;
      return foundedUser;
    },
    deleteUser(_, { id }) {
      let userIndex = users.findIndex((user) => id == user.id);
      let user = users.splice(userIndex, 1);
      return user;
    },
    addPost(_, { post }) {
      let newPost = { ...post, id: posts[posts.length - 1].id + 1 };
      posts.push(newPost);
      return newPost;
    },
    updatePost(_, { id, post }) {
      let foundedPost = posts.find((post) => post.id == id);
      foundedPost.title = post.title;
      return foundedPost;
    },
    deletePost(_, { id }) {
      let postIndex = posts.findIndex((post) => post.id == id);
      posts.splice(postIndex, 1);
      return posts[postIndex];
    },
    addComment(_, { comment }) {
      let newComment = { ...comment, id: comments[comments.length - 1] + 1 };
      comments.push(newComment);
      return newComment;
    },
    updateComment(_, { id, comment }) {
      let foundedComment = comments.find((comment) => comment.id == id);
      foundedComment.name = comment.name;
      return foundedComment;
    },
    deleteComment(_, { id }) {
      let commentIndex = comments.findIndex((comment) => comment.id == id);
      let comment = comments.splice(commentIndex, 1);
      return comment;
    },
  },
  Users: {
    posts(parent) {
      return posts.filter((post) => post.userId == parent.id);
    },
  },
  Post: {
    user(parent) {
      return users.find((user) => user.id == parent.userId);
    },
    comments(parent) {
      return comments.filter((comment) => comment.postId == parent.id);
    },
  },
  Comment: {
    post(parent) {
      return posts.find((post) => post.id == parent.postId);
    },
  },
};
