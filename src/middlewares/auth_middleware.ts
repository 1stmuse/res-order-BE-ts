import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { handleResponse } from "../helpers/utils"
import { createError } from "../helpers/errorCreator"
import UserServices from "../services/UserService"
dotenv.config()

export default async (req:Request, res:Response, next:NextFunction) => {
    try {
        const bearerHeader = <string>req.headers['authorization'];
        if(typeof bearerHeader == undefined ){
            throw createError(403, "Unauthorized, provide token")
        }

        const bearerToken = bearerHeader.split(' ')[1];
        const decoded = <any>jwt.verify(bearerToken, `${process.env.JWT_SECRET}`);
        if(!decoded) throw createError(400, "unauthorized, invalid token")
        // const user = await UserServices.getOne(decoded?.id)
        // if(!user) throw createError(400, "Invalid token, authentication failed")
        res.locals.userId = decoded?.id
        next()
        // handleResponse(res, 200, "sucees",user, bearerToken)
    
    } catch (error) {
        handleResponse(res, error.status ?? 400, error.message)
    }
}