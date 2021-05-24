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
const mongoose_1 = require("mongoose");
const userModel_1 = __importDefault(require("../models/userModel"));
class UserServices {
    static createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user;
                const userExist = yield userModel_1.default.findOne({ email: data.email });
                if (userExist)
                    throw new Error("user already exist");
                user = new userModel_1.default(data);
                const newUser = yield user.save();
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.isValidObjectId(id))
                    throw new Error("Invalid user Id");
                const userFound = yield userModel_1.default.findById(id);
                if (!userFound)
                    throw new Error("User with that id does not Exist");
                return userFound;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = UserServices;
