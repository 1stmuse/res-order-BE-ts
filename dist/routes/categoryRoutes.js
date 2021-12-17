"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.Router();
router.get("/:id", categoryController_1.getCategory);
router.post("/", categoryController_1.createCategory);
router.get("/", categoryController_1.getAllCategories);
exports.default = router;
