import Recipe from "../models/recipemodel"
import User from "../models/usermodel"
import {Request,Response} from "express"
import { JwtPayload } from "jsonwebtoken"

interface CustomRequest extends Request {
    uID?: JwtPayload;
  }

export async function createRecipe(req:CustomRequest,res:Response):Promise<any>{
    try{
        const {title,ingredients}=req.body;
        if(!title||!ingredients){
            return res.json({message:"All field are required"})
        }
        const recipe=await Recipe.create({title,ingredients})
        if(recipe){
            const user=await User.findOne({_id:req.uID?.id})
            console.log(user)
            user?.recipeId.push(recipe._id)
            await user?.save();
        }
        res.status(201).json({message:`Recipe created ,${recipe}`})

    }
    catch(err){
        console.log(err)
    }
    
}

export async function getRecipe(req:CustomRequest,res:Response):Promise<any>{
    try{
        const user=await User.findOne({_id:req.uID?.id})
        if(user){
            const recipes=await Recipe.find({_id:user.recipeId}) 
            if(recipes.length==0){
                res.json({message:"No recipe created"})
            }
            
            res.status(201).json(recipes)
        }

    }
    catch(err){
        console.log(err)
    }
    
}

export async function getRecipebyID(req:Request,res:Response):Promise<any>{
    try{
        console.log(req.params.id)
        const recipe=await Recipe.findOne({_id:req.params.id}) 
        if(recipe){    
            res.status(201).json(recipe)
        }else{
            return res.json({message:"Can't Find recipe"})
        }
    }
    catch(err){
        console.log(err)
    }
    
}

export async function updateRecipe(req:Request,res:Response):Promise<any>{
    try{
        const recipe=await Recipe.findOne({_id:req.params.id}) 
        if(recipe){
        recipe.title=req.body.title != undefined ?req.body.title : recipe?.title
        recipe.ingredients=req.body.ingredients != undefined ? req.body.ingredients : recipe?.ingredients
            
        await recipe.save();
        res.status(201).json({message:"Updated successfully"})
        }else{
            return res.json({message:"Can't Find recipe"})
        }
    }
    catch(err){
        console.log(err)
    }
    
}


export async function deleteRecipebyID(req:Request,res:Response):Promise<any>{
    try{
        const recipe=await Recipe.findOneAndDelete({_id:req.params.id}) 
        if(recipe){    
            res.status(201).json({message:"Deleted successfully"})
        }else{
            return res.json({message:"Can't Find recipe"})
        }
    }
    catch(err){
        console.log(err)
    }
    
}


