import todoModel from "../../models/todo.js";
const todoMutations = {
  //add todo
  async addTodo(_, args) {
    try {
      const newTodo = await todoModel.create(args.todo);
      return newTodo;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  // delete
  async deleteTodo(_, args, context) {
    if (context.user) {
      if (context.user.role == "admin") {
        await todoModel.findOneAndDelete({ _id: args.id });
        return "deleted";
      }
    } else {
      return "you are not authenticated";
    }
  },

  //update
  async updateTodo(_, args) {
    const todoUpdated = await todoModel.findByIdAndUpdate(
      { _id: args.id },
      { title: args.title, status: args.status }
    );
    return todoUpdated;
  },
};
export default todoMutations;
