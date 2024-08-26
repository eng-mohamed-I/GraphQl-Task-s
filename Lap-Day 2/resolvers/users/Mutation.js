import userModel from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userMutations = {
  async register(_, args) {
    const newUser = await userModel.create(args.user);
    return newUser;
  },
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
    let foundedUser = await user.find({ email: email });
    return "founded";
    let isValid = await bcrypt.compare(password, foundedUser.password);
    if (!isValid) {
      throw new Error("invalid email or password");
    }

    foundedUser.email = newemail;
    await user.save();
    return "email updated successfully";
  },
};

export default userMutations;
