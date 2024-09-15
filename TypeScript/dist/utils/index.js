"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.deleteUndefinedOrNull = void 0;
const deleteUndefinedOrNull = (data) => {
    Object.keys(data).forEach(key => {
        if (data[key] === undefined || null) {
            delete data[key];
        }
    });
    return data;
};
exports.deleteUndefinedOrNull = deleteUndefinedOrNull;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => next(error));
    };
};
exports.asyncHandler = asyncHandler;
