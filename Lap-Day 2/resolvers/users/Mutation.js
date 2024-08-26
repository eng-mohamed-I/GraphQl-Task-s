import { userModel } from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userMutation = {
  async register(_, args) {
    const newUser = await userModel.create(args.user);
    return newUser;
  },

  async login(_, args) {
    let { email, password } = args.user;

    if (!email || !password) {
      throw new Error("You must provide an email and password");
    }

    let user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid no user");
    }
    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid Password");
    }

    // Token generation moved inside the function
    let token = jwt.sign(
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
      { expiresIn: "24h" }
    );

    user.refreshToken = refreshToken;
    await user.save();
    return { token, refreshToken };
  },
};

export default userMutation;
