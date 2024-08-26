import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// const { validate } = require("graphql");

let userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 10,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]{3,8}[0-9]{0,5}(@)(gmail|yahoo|hotmail)(.com)$/.test(
          v
        );
      },
      message: ({ value }) => ` ${value} is not valid`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (doc, next) {
  let salt = await bcrypt.genSalt(10);
  console.log(this);
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

let userModel = mongoose.model("User", userSchema);
export default userModel;
