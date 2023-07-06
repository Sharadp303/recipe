"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipe_1 = require("../controller/recipe");
const routes1 = express_1.default.Router();
const authmiddleware_1 = require("../middleware/authmiddleware");
routes1.post('/recipe/create', [authmiddleware_1.verifyToken], recipe_1.createRecipe);
routes1.get('/recipe', [authmiddleware_1.verifyToken], recipe_1.getRecipe);
routes1.get('/recipe/:id', [authmiddleware_1.verifyToken], recipe_1.getRecipebyID);
routes1.put('/recipe/update/:id', [authmiddleware_1.verifyToken], recipe_1.updateRecipe);
routes1.delete('/recipe/delete/:id', [authmiddleware_1.verifyToken], recipe_1.deleteRecipebyID);
exports.default = routes1;
