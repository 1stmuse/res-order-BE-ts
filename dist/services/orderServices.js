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
const errorCreator_1 = require("../helpers/errorCreator");
const orderModel_1 = __importDefault(require("../models/orderModel"));
class OrderServices {
    static create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedOrder;
            if (!mongoose_1.isValidObjectId(order === null || order === void 0 ? void 0 : order.user))
                throw errorCreator_1.createError(400, "Invalid user Id");
            savedOrder = new orderModel_1.default(order);
            const data = yield savedOrder.save();
            if (!data)
                throw errorCreator_1.createError(400, "couls not create order");
            return data;
        });
    }
    static getUserOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let order;
            if (!mongoose_1.isValidObjectId(id))
                throw errorCreator_1.createError(400, "Invalid order Id");
            order = yield orderModel_1.default.find({ user: Object(id) }).populate("user", "fullname");
            if (!order)
                throw errorCreator_1.createError(404, "other not found");
            return order;
        });
    }
    static getAllOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield orderModel_1.default.find().populate("user", "fullname");
            if (!orders)
                throw errorCreator_1.createError(500, "internal server Error");
            return orders;
        });
    }
}
exports.default = OrderServices;
