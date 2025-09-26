function errorMiddleware(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ msg: err.message || "Server Error" });
}

module.exports = errorMiddleware;
