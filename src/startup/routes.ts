import express, {Application} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoute from '../routes/userRoute'
import orderRoute from "../routes/orderRoutes"
import categoryRoute from "../routes/categoryRoutes"

export default function(app:Application){
    app.use(express.json())
    app.use(cors())
    app.use(cookieParser())
    app.use('/api/v1/users', userRoute)
    app.use('/api/v1/orders', orderRoute)
    app.use("/api/v1/categories", categoryRoute)
}