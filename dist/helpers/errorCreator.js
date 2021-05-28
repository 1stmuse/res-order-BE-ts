"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = exports.RequestError = void 0;
class HttpError extends Error {
}
class RequestError extends HttpError {
    constructor(message) {
        super(message);
        this.status = 200; //default is success
    }
}
exports.RequestError = RequestError;
/**
* CREATES AN ERROR OBJECT THAT HANDLES BOTH INTERNAL AND SERVER ERRORS
* ERROR OBJECTS INHERITS FROM BOTH JS NATIVE ERROR AND HAVE EXTRA
* FIELD STATUS TO KNOW IF IT'S A REQUEST ERROR
*
* @param  {number} status The request status
* @param  {string} message The message to be returned
* @return {Object} error object
*
*/
function createError(status, message) {
    const error = new RequestError(message);
    error.status = status;
    return error;
}
exports.createError = createError;
