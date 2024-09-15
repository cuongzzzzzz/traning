"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const jobSchema = joi_1.default.object({
    title: joi_1.default.string()
        .required()
        .messages({
        "string.empty": "title is required",
        "any.required": "title is required",
    }),
    content: joi_1.default.string()
        .required()
        .messages({
        "string.empty": "content is required",
        "any.required": "content is required",
    })
});
exports.default = jobSchema;
