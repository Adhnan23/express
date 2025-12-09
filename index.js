import express from "express";
import { HttpError } from "./utils/Errors.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import connectDB from "./db/index.js";
import router from "./routes/todo.routes.js";

const PORT = process.env.PORT || 4000;

const app = express();

connectDB(process.env.DB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", router);

app.all("/api/*splat", (req, res) => {
  throw new HttpError(`Route '${req.url}' is not available`, 404);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
