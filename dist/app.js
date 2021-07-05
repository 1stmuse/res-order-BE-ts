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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dbInit_1 = __importDefault(require("./startup/dbInit"));
const routes_1 = __importDefault(require("./startup/routes"));
const userModel_1 = __importDefault(require("./models/userModel"));
exports.app = express_1.default();
const removeUser = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("removing all user");
    yield userModel_1.default.remove({});
    console.log("removed all users");
});
console.log(process.env.DB);
dbInit_1.default();
routes_1.default(exports.app);
// removeUser()
exports.app.listen(8081, () => {
    console.log(`server running`);
});
