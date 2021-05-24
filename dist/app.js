"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dbInit_1 = __importDefault(require("./startup/dbInit"));
const routes_1 = __importDefault(require("./startup/routes"));
exports.app = express_1.default();
console.log(process.env.DB);
dbInit_1.default();
routes_1.default(exports.app);
exports.app.listen(8080, () => {
    console.log(`server running`);
});
