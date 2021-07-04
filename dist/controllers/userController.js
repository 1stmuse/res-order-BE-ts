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
exports.verifyOtp = exports.resetPassword = exports.getUser = exports.login = exports.createUser = void 0;
const utils_1 = require("../helpers/utils");
const errorCreator_1 = require("../helpers/errorCreator");
const UserService_1 = __importDefault(require("../services/UserService"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = Object.assign({}, req.body);
    try {
        const user = yield UserService_1.default.create(userData);
        user.toObject();
        return utils_1.handleResponse(res, 200, 'user  created successfully');
    }
    catch (error) {
        return utils_1.handleResponse(res, (_a = error.status) !== null && _a !== void 0 ? _a : 500, error.message);
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    try {
        const user = yield UserService_1.default.auth(data);
        user.generateToken(user._id, (data) => {
            if (data == null)
                throw errorCreator_1.createError(500, "something went wrong, try again");
            const response = {
                name: user.fullname,
                email: user.email,
                phone: user.phone_number,
            };
            return utils_1.handleResponse(res, 200, "success", response, data);
        });
    }
    catch (error) {
        return utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield UserService_1.default.getOne(id);
        const response = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
        };
        return utils_1.handleResponse(res, 200, 'success', response);
    }
    catch (error) {
        return utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.getUser = getUser;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phone = req.body.phone;
    const id = res.locals.userId;
    try {
        console.log(id);
        const user = yield UserService_1.default.getOne(id);
        if (user.phone_number !== phone)
            throw errorCreator_1.createError(400, "phone number does not match user number");
        const opt = Math.floor(10000 + Math.random() * 90000);
        utils_1.sendOTP(`+234${user.phone_number}`, opt).then((message) => {
            console.log(message.sid);
            user.createOtp(`${opt}`);
            return utils_1.handleResponse(res, 200, "success");
        }).catch((err) => {
            if (err)
                return utils_1.handleResponse(res, 400, err.message);
        });
    }
    catch (error) {
        return utils_1.handleResponse(res, 500, error.message);
    }
});
exports.resetPassword = resetPassword;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = req.body.otp;
    const id = res.locals.userId;
    try {
        console.log(id);
        const user = yield UserService_1.default.getOne(id);
        if (user.reset_otp === otp)
            return utils_1.handleResponse(res, 200, "success move on");
        return utils_1.handleResponse(res, 400, "invalid otp");
    }
    catch (error) {
        return utils_1.handleResponse(res, 500, error.message);
    }
});
exports.verifyOtp = verifyOtp;
