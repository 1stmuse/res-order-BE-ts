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
exports.getCategory = exports.createCategory = void 0;
const utils_1 = require("../helpers/utils");
const CategoryServices_1 = __importDefault(require("../services/CategoryServices"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    try {
        const cat = yield CategoryServices_1.default.create(data);
        const response = {
            name: cat.name,
            id: cat._id
        };
        utils_1.handleResponse(res, 200, "sucess", response);
    }
    catch (error) {
        utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.createCategory = createCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const cat = yield CategoryServices_1.default.getOne(id);
        const response = {
            name: cat.name,
            id: cat._id
        };
        utils_1.handleResponse(res, 200, "sucess", response);
    }
    catch (error) {
        utils_1.handleResponse(res, error.status, error.message);
    }
});
exports.getCategory = getCategory;
