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
exports.seedProduct = void 0;
const axios_1 = __importDefault(require("axios"));
const productModel_1 = __importDefault(require("../models/productModel"));
const seedProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield productModel_1.default.remove({});
        const data = yield axios_1.default.get('https://fakestoreapi.com/products?limit=5');
        const products = yield data.data;
        // console.log(products)
        const datas = products.map((prod) => {
            let images = [];
            for (let i = 0; i < 5; i++) {
                images.push(prod.image);
            }
            return {
                name: prod === null || prod === void 0 ? void 0 : prod.title,
                price: prod === null || prod === void 0 ? void 0 : prod.price,
                available: true,
                category: prod === null || prod === void 0 ? void 0 : prod.category,
                description: prod === null || prod === void 0 ? void 0 : prod.description,
                images
            };
        });
        yield Promise.all(datas.map((ob) => __awaiter(void 0, void 0, void 0, function* () {
            const newProd = productModel_1.default.create(ob);
            (yield newProd).save();
        })));
        console.log("seeded succesfully");
    }
    catch (error) {
        console.log(error, "error oo");
    }
});
exports.seedProduct = seedProduct;
exports.seedProduct();
