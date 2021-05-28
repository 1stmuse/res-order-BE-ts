import mongoose, {Schema, Document, ObjectId } from 'mongoose'
import { productType } from './productModel'

export interface orderTypes extends Document {
    userId: ObjectId,
    total_price: number,
    items: productType[]
    billing_address: string
}

const orderSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    items:[{type: Schema.Types.ObjectId, ref: 'product'}],
    total_price: { type: Number, required:true},
    billing_address: {type: String}
}, {timestamps: true})

export default mongoose.model<orderTypes>('order', orderSchema)