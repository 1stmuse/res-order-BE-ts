"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = process.env.DB;
function default_1() {
    mongoose_1.default.connect(`${db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => {
        console.log(`Connected to ${db} ... working`);
        // console.log("seeding started")
        // seedProduct()
        // console.log("seeding complteed")
    });
    mongoose_1.default.Promise = global.Promise;
}
exports.default = default_1;
