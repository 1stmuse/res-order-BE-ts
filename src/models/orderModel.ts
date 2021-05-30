import mongoose, {Schema, Document, ObjectId } from 'mongoose'
import { productType } from './productModel'

export interface orderTypes extends Document {
    user: ObjectId,
    total_price: number,
    items: any []
    billing_address: string,
    dateOrdered: string
    status: string
}



const orderSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    items:[],
    total_price: { type: Number, default:0,},
    billing_address: {type: String},
    dateOrdered: { type: Date, default: Date.now},
    status: {type: String, default: "pending"}
}, {timestamps: true})

export default mongoose.model<orderTypes>('order', orderSchema)