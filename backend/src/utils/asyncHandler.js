/**
 * Wraps asynchronous route handlers and forwards any errors
 * to Express' global error-handling middleware.
 *
 * @param {Function} fn
 * @returns {Function}
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = asyncHandler;