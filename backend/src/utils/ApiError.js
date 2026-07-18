class ApiError extends Error {
    /**
     * Create a custom API error
     *
     * @param {number} statusCode - HTTP status code
     * @param {string} message - Error message
     */
    constructor(statusCode = 500, message = "Internal Server Error") {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.name = "ApiError";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;