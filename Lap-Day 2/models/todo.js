import mongoose from "mongoose";
let todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    uniquw: true,
    minLength: [3, "title must be at least 3 characters"],
    maxLength: 12,
  },
  status: {
    type: String,
    enum: ["todo", "In_progress", "Done"],
    default: "todo",
  },

  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

let todoModel = mongoose.model("todo", todoSchema);
export default todoModel;
