import jwt, {JwtPayload} from "jsonwebtoken"
import * as dotenv from "dotenv"
import {Request,Response,NextFunction} from "express"
dotenv.config()

 interface CustomRequest extends Request {
    uID?: JwtPayload;
  }

export async function verifyToken(req:CustomRequest,res:Response,next:NextFunction){
    try{
        const token=req.cookies.token
    if(!token){
        return res.json({message:"Unauthorised"})
    }
    
    const verification=jwt.verify(token,process.env.secretkey||'secretkey')
    
    if(!verification){
        return res.json({message:"Unauthorised"})  
    }
    
    req.uID = verification as JwtPayload;
    console.log(req.uID.id)
    next();
    }
    catch(err){
        res.status(401).json({ error: 'Invalid token' });
    }

}