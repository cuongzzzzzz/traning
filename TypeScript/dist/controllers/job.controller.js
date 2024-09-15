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
exports.JobController = void 0;
const job_service_1 = __importDefault(require("../services/job.service"));
const responses_1 = require("../responses");
class JobController {
    static add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new responses_1.SuccessResponse({
                message: "Create job successfully",
                metadata: yield job_service_1.default.add(req.body),
            }).send(res);
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return new responses_1.SuccessResponse({
                message: "get job successfully",
                metadata: yield job_service_1.default.getOne(id)
            }).send(res);
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new responses_1.SuccessResponse({
                message: "get jobs successfully",
                metadata: yield job_service_1.default.getAll(req.query)
            }).send(res);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return new responses_1.SuccessResponse({
                message: "update job successfully",
                metadata: yield job_service_1.default.update(id, req.body)
            }).send(res);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return new responses_1.SuccessResponse({
                message: "delete job successfully",
                metadata: yield job_service_1.default.delete(id)
            }).send(res);
        });
    }
}
exports.JobController = JobController;
