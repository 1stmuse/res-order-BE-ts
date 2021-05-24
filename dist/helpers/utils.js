"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
const handleResponse = (res, statusCode, message, data, token) => {
    return res.status(statusCode).json({
        message,
        data,
        token
    });
};
exports.handleResponse = handleResponse;
