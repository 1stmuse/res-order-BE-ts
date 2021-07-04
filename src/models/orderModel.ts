import mongoose, {Schema, Document, ObjectId } from 'mongoose'
import { UModel } from "./userModel"

export interface orderDoc extends Document {
    user: UModel
    total_price: number,
    items: any []
    billing_address: string,
    dateOrdered: string
    status: string
}

export interface orderTypes {
    user: string,
    total_price: number,
    items: any []
    billing_address: string,
    dateOrdered: string
    status: string
}



export const orderSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    items:[],
    total_price: { type: Number, default:0,},
    billing_address: {type: String},
    dateOrdered: { type: Date, default: Date.now},
    status: {type: String, default: "pending"}
}, {timestamps: true})

export default mongoose.model<orderDoc>('order', orderSchema)