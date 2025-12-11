import express from "express";
import { HttpError } from "./utils/Errors.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import connectDB from "./db/index.js";
import router from "./routes/todo.routes.js";
import respond from "./utils/respond.js";
import { generateToken } from "./utils/jwt.js";

const fakeUsers = [
  { username: "adhnan", password: "2273", role: "admin" },
  { username: "karots", password: "1234", role: "employee" },
];

const PORT = process.env.PORT || 4000;

const app = express();

connectDB(process.env.DB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", router);

app.post("/api/auth/login", (req, res) => {
  if (!req.body) throw new HttpError("Username and password is required", 400);

  const { username, password } = req.body;
  if (!username || !password)
    throw new HttpError("Username and password is required", 400);

  const user = fakeUsers.find((u) => u.username === username);

  if (!user) throw new HttpError("User Not Found", 404);
  if (user.password !== password)
    throw new HttpError("Invalid Credentials", 401);
  const token = generateToken({ username: user.username, role: user.role });
  res.send(respond(true, "Successfully Logged In", { token }));
});

app.all("/api/*splat", (req, res) => {
  throw new HttpError(`Route '${req.url}' is not available`, 404);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
