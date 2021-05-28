import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface categoryType extends Document {
    name: string,
}

const categorySchema = new Schema({
    name: {type: String, required: true},
})

export default mongoose.model<categoryType>("category", categorySchema)