import { HttpError } from "../utils/Errors.js";
import { verifyToken } from "../utils/jwt.js";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new HttpError("Token Not Provided", 401);

    const token = authHeader.split(" ")[1];
    if (!token) throw new HttpError("Token Not Provided", 401);

    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(new HttpError(err.publicMessage || "Invalid Token", 401));
  }
};

export const adminOnly = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new HttpError("Token Not Provided", 401);

    const token = authHeader.split(" ")[1];
    if (!token) throw new HttpError("Token Not Provided", 401);

    req.user = verifyToken(token);
    if (req.user.role !== "admin") throw new HttpError("Admin Only", 403);
    next();
  } catch (err) {
    next(new HttpError(err.publicMessage || "Invalid Token", 401));
  }
};

export const adminOrOwner = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new HttpError("Token Not Provided", 401);

    const token = authHeader.split(" ")[1];
    if (!token) throw new HttpError("Token Not Provided", 401);

    req.user = verifyToken(token);
    if (req.user.role !== "admin" && req.user.id)
      throw new HttpError("Admin and Owner Only", 403);
    next();
  } catch (err) {
    next(new HttpError(err.publicMessage || "Invalid Token", 401));
  }
};
