import { body, param } from "express-validator";
import validateAndSanitize from "./validator.js";

// Validators for Todo routes
export const createTodoValidator = [
  body("task")
    .notEmpty()
    .withMessage("Task is required")
    .isLength({ min: 3 })
    .withMessage("Task must be at least 3 characters"),
  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be true or false"),
  validateAndSanitize,
];

export const updateTodoValidator = [
  param("id").isMongoId().withMessage("Invalid Todo ID"),
  body("task")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Task must be at least 3 characters"),
  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be true or false"),
  validateAndSanitize,
];

export const getTodoValidator = [
  param("id").isMongoId().withMessage("Invalid Todo ID"),
  validateAndSanitize,
];

export const deleteTodoValidator = [
  param("id").isMongoId().withMessage("Invalid Todo ID"),
  validateAndSanitize,
];
