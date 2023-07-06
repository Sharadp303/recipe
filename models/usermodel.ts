import mongoose ,{Document} from "mongoose";

export interface UserDocument extends Document{
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
    recipeId:[any];

}
const userSchema = new mongoose.Schema<UserDocument>({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    recipeId:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Recipe"
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:new Date()
    },
    updatedAt:{
        type:Date,
        default:new Date()
    }
})

export default mongoose.model<UserDocument>("User",userSchema)