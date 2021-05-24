import express, {Application} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoute from '../routes/userRoute'

export default function(app:Application){
    app.use(express.json())
    app.use(cors())
    app.use(cookieParser())
    app.use('/api/v1/users', userRoute)
}