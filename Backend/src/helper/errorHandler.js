const errorHandler = (error) => {
  console.log(error)
  if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
    const errors = {}
    error.errors.forEach(err => {
      if (!errors[err.path]) {
        errors[err.path] = err.message;
      }
    })
    return errors;
  } else {
    return "internal server error"
  }
}

module.exports = errorHandler;