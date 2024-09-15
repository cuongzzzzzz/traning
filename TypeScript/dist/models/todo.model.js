"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const COLLECTION_NAME = "job";
const DOCUMENT_NAME = "jobs";
const jobSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
jobSchema.index({ title: "text", content: "text" });
const jobModel = mongoose_1.default.model(DOCUMENT_NAME, jobSchema);
exports.default = jobModel;
