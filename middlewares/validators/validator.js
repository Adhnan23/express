import { HttpError } from "../../utils/Errors.js";
import { validationResult } from "express-validator";

// Middleware to check validation results and store validated data
const validateAndSanitize = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    return next(new HttpError(messages.join(", ")));
  }

  // Store sanitized & validated data in req.validated
  req.validated = {
    body: req.body,
    params: req.params,
    query: req.query,
  };

  next();
};

export default validateAndSanitize;
