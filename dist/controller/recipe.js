"use strict";
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
exports.deleteRecipebyID = exports.updateRecipe = exports.getRecipebyID = exports.getRecipe = exports.createRecipe = void 0;
const recipemodel_1 = __importDefault(require("../models/recipemodel"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
function createRecipe(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, ingredients } = req.body;
            if (!title || !ingredients) {
                return res.json({ message: "All field are required" });
            }
            const recipe = yield recipemodel_1.default.create({ title, ingredients });
            if (recipe) {
                const user = yield usermodel_1.default.findOne({ _id: (_a = req.uID) === null || _a === void 0 ? void 0 : _a.id });
                console.log(user);
                user === null || user === void 0 ? void 0 : user.recipeId.push(recipe._id);
                yield (user === null || user === void 0 ? void 0 : user.save());
            }
            res.status(201).json({ message: `Recipe created ,${recipe}` });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createRecipe = createRecipe;
function getRecipe(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield usermodel_1.default.findOne({ _id: (_a = req.uID) === null || _a === void 0 ? void 0 : _a.id });
            if (user) {
                const recipes = yield recipemodel_1.default.find({ _id: user.recipeId });
                if (recipes.length == 0) {
                    res.json({ message: "No recipe created" });
                }
                res.status(201).json(recipes);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getRecipe = getRecipe;
function getRecipebyID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.params.id);
            const recipe = yield recipemodel_1.default.findOne({ _id: req.params.id });
            if (recipe) {
                res.status(201).json(recipe);
            }
            else {
                return res.json({ message: "Can't Find recipe" });
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getRecipebyID = getRecipebyID;
function updateRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipe = yield recipemodel_1.default.findOne({ _id: req.params.id });
            if (recipe) {
                recipe.title = req.body.title != undefined ? req.body.title : recipe === null || recipe === void 0 ? void 0 : recipe.title;
                recipe.ingredients = req.body.ingredients != undefined ? req.body.ingredients : recipe === null || recipe === void 0 ? void 0 : recipe.ingredients;
                yield recipe.save();
                res.status(201).json({ message: "Updated successfully" });
            }
            else {
                return res.json({ message: "Can't Find recipe" });
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.updateRecipe = updateRecipe;
function deleteRecipebyID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipe = yield recipemodel_1.default.findOneAndDelete({ _id: req.params.id });
            if (recipe) {
                res.status(201).json({ message: "Deleted successfully" });
            }
            else {
                return res.json({ message: "Can't Find recipe" });
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.deleteRecipebyID = deleteRecipebyID;
