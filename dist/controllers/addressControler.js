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
exports.getUserAddress = exports.addAddress = void 0;
const AddressServices_1 = __importDefault(require("../services/AddressServices"));
const utils_1 = require("../helpers/utils");
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    try {
        yield AddressServices_1.default.addAddress(data);
        utils_1.handleResponse(res, 200, "added succesfuly");
    }
    catch (error) {
        utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.addAddress = addAddress;
const getUserAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = res.locals) === null || _a === void 0 ? void 0 : _a.userId;
        const data = yield AddressServices_1.default.getAddress(id);
        utils_1.handleResponse(res, 200, "success", data);
    }
    catch (error) {
        utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.getUserAddress = getUserAddress;
