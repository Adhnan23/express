import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controllers/todo.controller.js";
import {
  createTodoValidator,
  deleteTodoValidator,
  getTodoValidator,
  updateTodoValidator,
} from "../middlewares/validators/todos.validator.js";
import { adminOnly, auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", adminOnly, getAllTodos);
router.get("/:id", auth, getTodoValidator, getTodoById);
router.post("/", createTodoValidator, createTodo);
router.put("/:id", updateTodoValidator, updateTodo);
router.delete("/:id", deleteTodoValidator, deleteTodo);

export default router;
