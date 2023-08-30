class ApiError extends Error {
    constructor(status, message, errors = []) {
        super();
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static badRequest(message, errors = []) {
        return new ApiError(404, message, errors);
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorized');
    }

    static internal(message) {
        return new ApiError(500, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }
}

module.exports = ApiError;
