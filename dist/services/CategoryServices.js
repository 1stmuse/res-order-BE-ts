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
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
class CategoryServices {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let cat;
            const isExist = yield categoryModel_1.default.findOne({ name: data.name });
            if (isExist)
                throw errorCreator_1.createError(400, "category already exist");
            cat = new categoryModel_1.default(data);
            yield cat.save();
            if (!cat)
                throw errorCreator_1.createError(500, "could not create categroy");
            return cat;
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongoose_1.isValidObjectId(id))
                throw errorCreator_1.createError(400, "invalid category id");
            let cat;
            cat = yield categoryModel_1.default.findById(id);
            if (!cat)
                throw errorCreator_1.createError(404, "category not found");
            return cat;
        });
    }
}
exports.default = CategoryServices;
