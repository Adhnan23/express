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

export const updateTodo = async (req, res) => {
  const id = req.validated.params.id;
  const todoData = req.validated.body;
  const updatedTodo = await todosServices.updateTodo(id, todoData);
  if (!updatedTodo) throw new HttpError("Todo not found", 404);
  return res.send(respond(true, "Todo Updated Successfully", updatedTodo));
};

export const deleteTodo = async (req, res) => {
  const id = req.validated.params.id;
  const deletedTodo = await todosServices.deleteTodo(id);
  if (!deletedTodo) throw new HttpError("Todo not found", 404);
  res.send(respond(true, "Todo Deleted Successfully", deletedTodo));
};
