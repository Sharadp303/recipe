"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    recipeId: {
        type: [mongoose_1.default.SchemaTypes.ObjectId],
        ref: "Recipe"
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});
exports.default = mongoose_1.default.model("User", userSchema);
