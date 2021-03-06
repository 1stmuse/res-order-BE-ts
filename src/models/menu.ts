import mongoose, {Schema, Document } from 'mongoose'

export interface MenuTypes extends Document {
    description: string,
    img: string,
    price: number,
    category: string
}

const MenuSchema: Schema = new Schema({
    description: { type: String, required: true },
    img: {type: String, required:true},
    price: { type: Number, required:true},
    category: { type:Number, required:true }
})

export default mongoose.model<MenuTypes>('Menu', MenuSchema)