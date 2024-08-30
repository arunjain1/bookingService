const {StatusCodes} = require('http-status-codes');

class AppError extends Error{
    constructor(name,message,description,statusCode){
      super();
      this.message = message;
      this.name = name;
      this.description = description;
      this.statusCode = statusCode;
    }
}

module.exports = AppError