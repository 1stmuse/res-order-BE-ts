import { Application } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { seedProduct } from "../seedDb/Products"

dotenv.config()

const db = process.env.DB

export default function():void {
    mongoose.connect(`${db}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
    })
    .then(()=> {
        console.log(`Connected to ${db} ... working`)
        // console.log("seeding started")
        // seedProduct()
        // console.log("seeding complteed")
    })
    mongoose.Promise = global.Promise
}