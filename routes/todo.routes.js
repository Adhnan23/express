import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
} from "../controllers/todo.controller.js";
import {
  createTodoValidator,
  getTodoValidator,
} from "../middlewares/validators/todos.validator.js";

const router = Router();

router.get("/", getAllTodos);
router.get("/:id", getTodoValidator, getTodoById);
router.post("/", createTodoValidator, createTodo);
router.put("/:id", () => (req, res) => res.send("Update a todo"));
router.delete("/", () => (req, res) => res.send("Delete a todo"));

export default router;
