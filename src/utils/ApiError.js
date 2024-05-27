class ApiError extends Error {
  constructor( // constructing or default
    statusCode,
    message = "something went wrong",
    errors = [],
    stack = "",
  ) {
    super(message); // asssuming or fixing or custom
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
