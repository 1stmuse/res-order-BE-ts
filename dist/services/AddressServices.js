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
const addressModel_1 = __importDefault(require("../models/addressModel"));
const errorCreator_1 = require("../helpers/errorCreator");
class AddressServices {
    static addAddress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let address;
            const itExist = yield addressModel_1.default.find({ name: data === null || data === void 0 ? void 0 : data.name });
            if (itExist)
                throw errorCreator_1.createError(404, "addres already Exist");
            address = new addressModel_1.default(data);
            address = yield address.save();
            if (!address)
                throw errorCreator_1.createError(500, "internal server error");
            return true;
        });
    }
    static getAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let address;
            address = yield addressModel_1.default.find({ userId: id });
            if (!address)
                throw errorCreator_1.createError(400, "user address not found");
            return address;
        });
    }
}
exports.default = AddressServices;
