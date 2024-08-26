import { todoModel } from "../../models/todo.js";

const todosQueries = {
  async todos() {
    let todos = await todoModel.find();
    return todos;
  },
};

export default todosQueries;
