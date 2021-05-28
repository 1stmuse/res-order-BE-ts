import mongoose, {Schema, Document, ObjectId} from "mongoose";
import { categoryType } from "./categoryModel";

export interface productType extends Document {
    name: string,
    price: string,
    available: boolean,
    category : categoryType
    description: string,
    images: string[]
}

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    available: {type: Boolean, default: true},
    category: {type: Schema.Types.ObjectId, ref: "category"},
    description: {type: String, required: true},
    images: [{type: String}]
})

export default mongoose.model<productType>("product", productSchema)