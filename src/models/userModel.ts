import mongoose , { Schema, Document } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { timeStamp } from 'console'

export interface UserType extends Document {
    username: string,
    password: string
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique:true },
    password: { type: String, required: true }
}, {timestamps:true})

UserSchema.pre('save', function(this:UserType, next:any){
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