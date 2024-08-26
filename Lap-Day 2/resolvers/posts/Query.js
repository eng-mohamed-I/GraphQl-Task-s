import postModel from "../../models/post.js";

export const postQueries = {
  async posts() {
    let posts = await postModel.find();
    return posts;
  },
};
