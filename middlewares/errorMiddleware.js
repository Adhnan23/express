import respond from "../utils/respond.js";

const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  const status = err.statusCode || 500;

  const message = isProd
    ? err.publicMessage || "Somthing went wrong"
    : err.message;
  const errors = isProd ? null : err;

  res.status(status).send(respond(false, message, null, errors));
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }
};

export default errorHandler;
