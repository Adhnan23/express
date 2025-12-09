import todosServices from "../services/todos.services.js";
import { HttpError } from "../utils/Errors.js";
import respond from "../utils/respond.js";

export const getAllTodos = async (req, res) => {
  const todos = await todosServices.getAllTodos();
  res.send(respond(true, "Todos Fetched Successfully", todos));
};

export const getTodoById = async (req, res) => {
  const id = req.validated.params.id;
  const todo = await todosServices.getTodoById(id);
  if (!todo) throw new HttpError("Todo not found", 404);
  res.send(respond(true, "Todo Fetched Successfully", todo));
};

export const createTodo = async (req, res) => {
  const todoData = req.validated.body;
  const todo = await todosServices.createTodo(todoData);
  res.send(respond(true, "Todo Created Successfully", todo));
};
