"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_middleware_1 = __importDefault(require("../middlewares/auth_middleware"));
const router = express_1.Router();
router.get('/:id', userController_1.getUser);
router.post('/auth', userController_1.login);
router.post('/verifyOtp', auth_middleware_1.default, userController_1.verifyOtp);
router.post("/resetPasswordOtp", auth_middleware_1.default, userController_1.resetPasswordOtp);
router.post("/resetPassword", auth_middleware_1.default, userController_1.resetPassword);
router.post('/', userController_1.createUser);
exports.default = router;
