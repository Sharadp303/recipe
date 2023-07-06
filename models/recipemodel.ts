import mongoose, {Document} from "mongoose";

export interface RecipeDocument extends Document{
    title:string;
    ingredients:[string]
}

const recipeSchema= new mongoose.Schema<RecipeDocument>({
    title:{
        type:String,
        required:true
    },
    ingredients:[{
        type:String,
        required:true
    }]

})
export default mongoose.model<RecipeDocument>("Recipe",recipeSchema)