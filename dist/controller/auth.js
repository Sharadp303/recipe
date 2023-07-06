"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.signIn = exports.signUp = void 0;
const usermodel_1 = __importDefault(require("../models/usermodel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.json({ message: "All field are required" });
            }
            const existingUser = yield usermodel_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User Already exists" });
            }
            const newuser = yield usermodel_1.default.create({
                email: email,
                password: bcryptjs_1.default.hashSync(password, 8)
            });
            res.status(201).json({ message: "Signed Up successfully" });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.signUp = signUp;
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.json({ message: "All field are required" });
            }
            const user = yield usermodel_1.default.findOne({ email });
            if (!user) {
                return res.json({ messsage: "Invalid Email or password" });
            }
            const validpass = bcryptjs_1.default.compareSync(password, user.password);
            if (!validpass) {
                return res.json({ messsage: "Invalid Email or password" });
            }
            const token = yield jsonwebtoken_1.default.sign({ id: user._id }, process.env.secretkey || 'secretkey', { expiresIn: "1h" });
            res.cookie("token", token, {
                expires: new Date(Date.now() + (10 * 60 * 1000)),
                httpOnly: false,
            });
            res.status(201).json({ message: "Signed In successfully" });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.signIn = signIn;
