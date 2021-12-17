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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.UserSchema = new mongoose_1.Schema({
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    reset_otp: { type: String, default: "" },
    otp_expires: { type: Number, default: 0 },
}, { timestamps: true });
exports.UserSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err)
                return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
exports.UserSchema.methods.generateToken = function (userId, cb) {
    jsonwebtoken_1.default.sign({ id: userId }, `${process.env.JWT_SECRET}`, (err, token) => {
        if (err)
            cb(null);
        cb(token);
    });
};
exports.UserSchema.methods.createOtp = function (otp) {
    var user = this;
    const today = new Date();
    const future = today.getMinutes() + 1;
    user.reset_otp = otp;
    user.otp_expires = future;
    user.save();
};
exports.UserSchema.methods.resetPassword = function (pass) {
    var user = this;
    user.password = pass;
    user.otp_expires = 0;
    user.reset_otp = "";
    user.save();
};
exports.default = mongoose_1.default.model("user", exports.UserSchema);
