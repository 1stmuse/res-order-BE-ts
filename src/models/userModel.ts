import mongoose , { Schema, Document, ObjectId } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { orderTypes } from './orderModel'

export interface UserType extends Document {
    fullname: string,
    password: string,
    email: string,
    phone_number: string
    orders: orderTypes[]
}

const UserSchema: Schema = new Schema({
    fullname: { type: String, required: true, },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: {type: String, required: true },
    orders: [{
        type: Schema.Types.ObjectId, ref: "order"
    }]
}, {timestamps:true})

UserSchema.pre<UserType>('save', function(this:UserType, next: any){
    var user = this
    if(user.isModified('password')){
        bcrypt.genSalt(10, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})

export default mongoose.model<UserType>('user', UserSchema)