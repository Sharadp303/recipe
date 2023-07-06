import User from "../models/usermodel"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {Request,Response} from "express"
import * as dotenv from "dotenv"
dotenv.config()

export async function signUp(req:Request,res:Response):Promise<any>{
    try{
        
        const {email,password}=req.body
        if(!email || !password){
            return res.json({message:"All field are required"})
        }
        
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message:"User Already exists"})
        }

        const newuser=await User.create({
            email:email,
            password:bcrypt.hashSync(password,8)
        })
        res.status(201).json({message:"Signed Up successfully"})
    }
    catch(err){
        console.log(err)
    }
}

export async function signIn(req:Request,res:Response):Promise<any>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.json({message:"All field are required"})
        }

        const user=await User.findOne({email})
        if(!user){
            return res.json({messsage:"Invalid Email or password"})
        }
        
        const validpass=bcrypt.compareSync(password,user.password)
        if(!validpass){
            return res.json({messsage:"Invalid Email or password"})
        }

        const token=await jwt.sign({id:user._id},process.env.secretkey||'secretkey',{expiresIn:"1h"})

        res.cookie("token",token,{
            expires:new Date(Date.now() + (10 * 60 * 1000)),
            httpOnly:false,
        })
        res.status(201).json({message:"Signed In successfully"})

    }
    catch(err){
        console.log(err)
    }

}
