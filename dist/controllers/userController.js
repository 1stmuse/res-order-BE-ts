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
exports.getUser = exports.createUser = void 0;
const utils_1 = require("../helpers/utils");
const UserService_1 = __importDefault(require("../services/UserService"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign({}, req.body);
    try {
        const user = yield UserService_1.default.create(userData);
        user.toObject();
        const response = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
            orders: user.orders
        };
        return utils_1.handleResponse(res, 200, 'user  created successfully', response);
    }
    catch (error) {
        return utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.createUser = createUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield UserService_1.default.getOne(id);
        const response = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
            orders: user.orders
        };
        return utils_1.handleResponse(res, 200, 'success', response);
    }
    catch (error) {
        return utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.getUser = getUser;
