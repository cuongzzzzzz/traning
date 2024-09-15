"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = __importDefault(require("../models/todo.model"));
const responses_1 = require("../responses");
const job_schema_1 = __importDefault(require("../schemas/job.schema"));
const utils_1 = require("../utils");
class Jobservice {
    static add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = job_schema_1.default.validate(data, { abortEarly: false });
            if (error)
                throw new responses_1.ErrorResponse(422, error.details[0].message);
            const newJob = yield todo_model_1.default.create(data);
            return newJob;
        });
    }
    static getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, limit = 10, isCompleted = "all", sort = "time-asc", s } = query;
            if (limit <= 0)
                throw new responses_1.ErrorResponse(422, "limit must be a positive");
            if (page <= 0)
                throw new responses_1.ErrorResponse(422, "page must be a positive");
            const sortOption = sort === "time-asc" ? { createdAt: 1 } : { createdAt: -1 };
            const filter = Object.assign(Object.assign({}, (s && { $text: { $search: s } })), (isCompleted !== "all" && { isCompleted: isCompleted === "completed" }));
            const skip = limit * (page - 1);
            const [allJobs, total] = yield Promise.all([
                todo_model_1.default.find(filter).skip(skip).limit(limit).sort(sortOption).lean(),
                todo_model_1.default.countDocuments(filter)
            ]);
            const totalPage = Math.ceil(total / limit);
            return {
                totalPage,
                total,
                limit: +limit,
                currentPage: page,
                data: allJobs
            };
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundJob = yield todo_model_1.default.findById(id);
            if (!foundJob)
                throw new responses_1.ErrorResponse(404, "job not found");
            return foundJob;
        });
    }
    static update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateObj = (0, utils_1.deleteUndefinedOrNull)(update);
            const updateJob = yield todo_model_1.default.findByIdAndUpdate(id, updateObj, { new: true, runValidators: true });
            if (!updateJob)
                throw new responses_1.ErrorResponse(404, "job not found");
            return updateJob;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundJob = yield todo_model_1.default.findById(id);
            if (!foundJob)
                throw new responses_1.ErrorResponse(404, "not found or deleted");
            return yield todo_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = Jobservice;
