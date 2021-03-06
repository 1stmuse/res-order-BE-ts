import { Application } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const db = process.env.DB

export default function():void {
    mongoose.connect(`${db}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
    })
    .then(()=> console.log(`Connected to ${db} ... working`))
    
    mongoose.Promise = global.Promise
}