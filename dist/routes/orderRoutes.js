"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const router = express_1.Router();
router.get("/:id", orderController_1.getOrder);
router.post("/", orderController_1.createOrder);
exports.default = router;
