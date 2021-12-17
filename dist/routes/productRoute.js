"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const auth_middleware_1 = __importDefault(require("../middlewares/auth_middleware"));
const router = express_1.Router();
router.get("/", productController_1.getProducts);
router.get("/:id", productController_1.getProduct);
router.post("/", auth_middleware_1.default, productController_1.createProduct);
exports.default = router;
