import userModel from "../../models/user.js";

export const userQueries = {
  async users() {
    let users = await userModel.find();
    return users;
  },
  async user(_, args) {
    let user = await userModel.findById(args.id);
    return user;
  },
};
