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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const errorCreator_1 = require("../helpers/errorCreator");
class UserServices {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            const userExist = yield userModel_1.default.findOne({ email: data.email });
            if (userExist)
                throw errorCreator_1.createError(400, "user already exist");
            user = new userModel_1.default(data);
            const newUser = yield user.save();
            if (!newUser)
                throw errorCreator_1.createError(500, "server error");
            return newUser;
        });
    }
    static auth(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ email: data.email });
            if (!user)
                throw errorCreator_1.createError(400, "email or password incorrect");
            const password = bcrypt_1.default.compareSync(data.password, user.password);
            if (!password)
                throw errorCreator_1.createError(400, "email or password incorrect");
            return user;
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.isValidObjectId(id))
                throw errorCreator_1.createError(400, "Invalid user Id");
            const userFound = yield userModel_1.default.findById(id);
            if (!userFound)
                throw errorCreator_1.createError(404, "User with that id does not Exist");
            return userFound;
        });
    }
}
exports.default = UserServices;
