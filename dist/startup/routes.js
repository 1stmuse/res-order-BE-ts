"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("../routes/userRoute"));
function default_1(app) {
    app.use(express_1.default.json());
    app.use(cors_1.default());
    app.use(cookie_parser_1.default());
    app.use('/api/v1/users', userRoute_1.default);
}
exports.default = default_1;
