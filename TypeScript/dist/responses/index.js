"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
class SuccessResponse {
    constructor({ message = '', status = 200, metadata = {}, }) {
        this.message = message;
        this.status = status;
        this.metadata = metadata;
    }
    send(res) {
        res.status(this.status).json(this);
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ErrorResponse = ErrorResponse;
