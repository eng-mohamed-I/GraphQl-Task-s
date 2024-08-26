import postModel from "../../models/post.js";
const postMutations = {
  async addPost(_, args) {
    try {
      const newPost = await postModel.create(args.post);
      return newPost;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async deletePost(_, args, context) {
    if (context.user) {
      if (context.user.role == "admin") {
        await postModel.findOneAndDelete({ _id: args.id });
        return "post deleted successfuly";
      }
    } else {
      return "you are not authenticated";
    }
  },
  async updatePost(_, args) {
    const postUpdated = await postModel.findByIdAndUpdate(
      { _id: args.id },
      { title: args.title, status: args.status }
    );
    return postUpdated;
  },
};
export default postMutations;
