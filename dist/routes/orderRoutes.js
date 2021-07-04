"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const router = express_1.Router();
router.get("/", orderController_1.getAllOrder);
router.get("/:userId", orderController_1.getUserOrders);
router.post("/", orderController_1.createOrder);
exports.default = router;
