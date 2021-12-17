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
const productModel_1 = __importDefault(require("../models/productModel"));
class ProductServices {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let product;
            product = new productModel_1.default(data);
            yield product.save();
            if (!product)
                throw errorCreator_1.createError(500, "could not create product");
            return product;
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.isValidObjectId(id))
                throw errorCreator_1.createError(400, "invalid product ID");
            let product;
            product = yield productModel_1.default.findById(id).populate("category", "name");
            if (!product)
                throw errorCreator_1.createError(404, "could not get product");
            return product;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let products;
            products = yield productModel_1.default.find();
            if (!products)
                throw errorCreator_1.createError(404, "could not get product");
            return products;
        });
    }
}
exports.default = ProductServices;
