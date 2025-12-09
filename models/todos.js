import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const Todos = mongoose.model("todos", todoSchema);

export default Todos;
