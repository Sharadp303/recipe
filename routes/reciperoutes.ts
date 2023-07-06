import express from 'express';
import {createRecipe,getRecipe,getRecipebyID,updateRecipe,deleteRecipebyID} from "../controller/recipe"
const routes1= express.Router()
import {verifyToken} from  "../middleware/authmiddleware"
routes1.post('/recipe/create',[verifyToken],createRecipe)
routes1.get('/recipe',[verifyToken],getRecipe)
routes1.get('/recipe/:id',[verifyToken],getRecipebyID)
routes1.put('/recipe/update/:id',[verifyToken],updateRecipe)
routes1.delete('/recipe/delete/:id',[verifyToken],deleteRecipebyID)

export default routes1;