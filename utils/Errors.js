class HttpError extends Error {
  constructor(message, statusCode = 400, publicMessage = null) {
    super(message);
    this.statusCode = statusCode;
    this.publicMessage = publicMessage || message;
  }
}

export { HttpError };
