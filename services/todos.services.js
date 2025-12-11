import Todos from "../models/todos.js";
import { HttpError } from "../utils/Errors.js";

const todosServices = {
  getAllTodos: async () => {
    return await Todos.find();
  },
  getTodoById: async (id) => {
    const todo = await Todos.findById(id);
    return todo;
  },
  createTodo: async (todoData) => {
    const newTodo = await Todos.insertOne(todoData);
    return newTodo;
  },
  updateTodo: async (id, todoData) => {
    const updatedTodo = await Todos.findByIdAndUpdate(id, todoData, {
      new: true,
    });
    return updatedTodo;
  },

  deleteTodo: async (id) => {
    const deletedTodo = await Todos.findByIdAndDelete(id);
    if (!deletedTodo) throw new HttpError("Todo not found", 404);
    return deletedTodo;
  },
};

export default todosServices;
