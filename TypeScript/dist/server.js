"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_init_1 = __importDefault(require("./db/mongo.init"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const job_router_1 = __importDefault(require("./routers/job.router"));
const helmet_1 = __importDefault(require("helmet"));
const responses_1 = require("./responses");
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const port = 3000;
mongo_init_1.default.getInstance();
app.use(job_router_1.default);
app.use((req, res, next) => {
    const error = new responses_1.ErrorResponse(404, "Not found");
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Internal Server Error",
        stack: err.stack,
        statusCode: err.status
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
