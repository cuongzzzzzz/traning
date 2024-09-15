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
const mongoose_1 = __importDefault(require("mongoose"));
class MongoConnect {
    constructor() {
        this.instance = null;
    }
    createConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect("mongodb://localhost:27017/todo");
                console.log("connect successfully!");
                return mongoose_1.default.connection;
            }
            catch (error) {
                console.log("failed to connect :::", error.message);
                throw new Error("failed to connect to mongo");
            }
        });
    }
    getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance || this.instance.readyState === 0) {
                this.instance = yield this.createConnect();
                return this.instance;
            }
            return this.instance;
        });
    }
}
exports.default = new MongoConnect();
