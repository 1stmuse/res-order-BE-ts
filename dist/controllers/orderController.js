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
exports.getOrder = exports.createOrder = void 0;
const utils_1 = require("../helpers/utils");
const orderServices_1 = __importDefault(require("../services/orderServices"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    try {
        const order = yield orderServices_1.default.create(data);
        const response = {
            total_price: order.total_price,
            items: order.items,
            billing_address: order.billing_address
        };
        utils_1.handleResponse(res, 200, "order created", response);
    }
    catch (error) {
        utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.createOrder = createOrder;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield orderServices_1.default.getOne(id);
        const response = {
            total_price: order.total_price,
            items: order.items,
            billing_address: order.billing_address
        };
        utils_1.handleResponse(res, 200, "success", response);
    }
    catch (error) {
        utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.getOrder = getOrder;
