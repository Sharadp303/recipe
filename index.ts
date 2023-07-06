import express,{Express,Request,Response} from "express"
import mongoose from "mongoose"
import cors from 'cors';
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv"
import routes from "./routes/authroutes"
import routes1 from "./routes/reciperoutes"
dotenv.config()

const app:Express=express()

app.use(express.json())
app.use(cors({
    credentials:true
}))
app.use(cookieParser())



mongoose.connect(process.env.Mongo_url || '').then(()=>{
     console.log("Connected to Db")
 }).catch((err)=>console.log(err))

app.use(routes)
app.use(routes1)

app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
})