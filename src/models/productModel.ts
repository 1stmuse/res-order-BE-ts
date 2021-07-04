import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface productType extends Document {
    name: string,
    price: string,
    available: boolean,
    category : string,
    description: string,
    images: string[],
    createdAt: number
}

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    available: {type: Boolean, default: true},
    category: {type: String, require: true},
    description: {type: String, required: true},
    images: [{type: String}],
    createdAt: {type: Date, default: Date.now, required: true}
})

export default mongoose.model<productType>("product", productSchema)