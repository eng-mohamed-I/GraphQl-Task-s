import userModel from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userMutations = {
  //add user
  async register(_, args) {
    //hash password
    // let salt = await bcrypt.genSalt(10);
    // let hashedPassword = await bcrypt.hash(args.user.password, salt);
    // args.user.password = hashedPassword;
    const newUser = await userModel.create(args.user); //send new user
    return newUser;
  },
  //Login user
  async login(_, args) {
    let { email, password } = args.user;
    if (!email || !password) {
      throw new Error("you must provide an email address and password");
    }
    let user = await userModel.findOne({ email: email });

    if (!user) {
      throw new Error("envalid email or password");
    }
    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("invalid email or password");
    }

    let token = await jwt.sign(
      {
        data: { id: user._id, role: user.role },
      },
      process.env.TOKENSECRET,
      { expiresIn: "24h" }
    );

    let refreshToken = jwt.sign(
      {
        data: { id: user._id, role: user.role },
      },
      process.env.REFRESHSECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();
    return { token, refreshToken };
  },

  //update user
  async updateUser(_, args) {
    let { email, password } = args.user;
    let { newemail } = args.update;
    if (!email || !password) {
      throw new Error("email or password invalid");
    }
    let foundedUser = await userModel.findOne({ email: email });
    if (!foundedUser) {
      throw new Error("not founded");
    }

    let isValid = await bcrypt.compare(password, foundedUser.password);
    if (!isValid) {
      throw new Error("invalid email or password");
    }
    foundedUser.email = newemail;
    await foundedUser.save();
    return "email updated successfully";
  },

  //delete User
  async deleteUser(_, { id }) {
    await userModel.findOneAndDelete({ _id: id });
    return "deleted";
    //first pull
    //sec pull
    //third pull
  },
};
// delete user

export default userMutations;
