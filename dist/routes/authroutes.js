"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controller/auth");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.post('/user/signup', auth_1.signUp);
routes.post('/user/signin', auth_1.signIn);
exports.default = routes;
