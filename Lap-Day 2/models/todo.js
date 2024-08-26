import mongoose from "mongoose";

let todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Todo", "In-progress", "Done"],
    default: "Todo",
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

let todoModel = mongoose.model("Todo", todoSchema);
export { todoModel };
