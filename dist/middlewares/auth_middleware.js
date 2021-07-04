"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const utils_1 = require("../helpers/utils");
const errorCreator_1 = require("../helpers/errorCreator");
dotenv.config();
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader == undefined) {
            throw errorCreator_1.createError(403, "Unauthorized, provide token");
        }
        const bearerToken = bearerHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(bearerToken, `${process.env.JWT_SECRET}`);
        if (!decoded)
            throw errorCreator_1.createError(400, "unauthorized, invalid token");
        // const user = await UserServices.getOne(decoded?.id)
        // if(!user) throw createError(400, "Invalid token, authentication failed")
        res.locals.userId = decoded === null || decoded === void 0 ? void 0 : decoded.id;
        next();
        // handleResponse(res, 200, "sucees",user, bearerToken)
    }
    catch (error) {
        utils_1.handleResponse(res, (_a = error.status) !== null && _a !== void 0 ? _a : 400, error.message);
    }
});
