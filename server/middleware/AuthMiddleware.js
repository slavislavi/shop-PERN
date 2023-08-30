const jwt = require('jsonwebtoken');
const ApiError = require("../error/ApiError");
const tokenService = require('../service/tokenService');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const userData = tokenService.validateAccessToken(token);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
