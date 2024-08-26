import todoModel from "../../models/todo.js";

export const todoQueries = {
  async todos() {
    let todos = await todoModel.find();
    return todos;
  },
};
