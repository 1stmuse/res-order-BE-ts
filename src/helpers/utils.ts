import {Response} from 'express'

export const handleResponse = (res:Response, statusCode:number, message:string, data?:any, token?:string)=>{
    return res.status(statusCode).json({
        message,
        data,
        token
    })
}