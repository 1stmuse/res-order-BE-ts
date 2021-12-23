"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addressControler_1 = require("../controllers/addressControler");
const auth_middleware_1 = __importDefault(require("../middlewares/auth_middleware"));
const router = express_1.Router();
router.get("/", auth_middleware_1.default, addressControler_1.getUserAddress);
router.post("/", auth_middleware_1.default, addressControler_1.addAddress);
exports.default = router;
