import mongoose from "mongoose";
let postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    uniquw: true,
    minLength: [3, "title must be at least 3 characters"],
    maxLength: 12,
  },
  status: {
    type: String,
    enum: ["Post", "In_progress", "Done"],
    default: "Post",
  },

  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

let postModel = mongoose.model("Post", postSchema);
export default postModel;
