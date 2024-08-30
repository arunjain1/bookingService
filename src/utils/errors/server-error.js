const {StatusCodes} = require('http-status-codes');

class ServerError extends Error{
    constructor(
        message = "Something Went Wrong",
        explaination = "Server Error",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ){
       super();
       this.name = "Server Error";
       this.message = message;
       this.explaination = explaination;
       this.statusCode = statusCode;
    }
}

module.exports = ServerError;