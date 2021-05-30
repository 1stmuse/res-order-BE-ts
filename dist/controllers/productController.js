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
exports.getProducts = exports.getProduct = exports.createProduct = void 0;
const utils_1 = require("../helpers/utils");
const ProductServices_1 = __importDefault(require("../services/ProductServices"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    try {
        const product = yield ProductServices_1.default.create(data);
        const response = {
            name: product.name,
            description: product.description,
            id: product._id,
            images: product.images,
            category: product.category,
            price: product.available,
            available: product.available,
            createdAt: product.createdAt
        };
        utils_1.handleResponse(res, 200, "success", response);
    }
    catch (error) {
        utils_1.handleResponse(res, error.error, error.message);
    }
});
exports.createProduct = createProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield ProductServices_1.default.getOne(id);
        const response = {
            name: product.name,
            description: product.description,
            id: product._id,
            images: product.images,
            category: product.category,
            price: product.available,
            available: product.available,
            createdAt: product.createdAt
        };
        utils_1.handleResponse(res, 200, "success", response);
    }
    catch (error) {
        utils_1.handleResponse(res, error.error, error.message);
    }
});
exports.getProduct = getProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductServices_1.default.getAll();
        const response = products;
        utils_1.handleResponse(res, 200, "success", response);
    }
    catch (error) {
        utils_1.handleResponse(res, error.error, error.message);
    }
});
exports.getProducts = getProducts;
