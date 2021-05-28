import {Response, Request, NextFunction} from 'express'
import {handleResponse} from '../helpers/utils'
import UserService from "../services/UserService"

export const createUser = async (req:Request, res:Response, next:NextFunction)=>{
    const userData = {
        ...req.body
    }
    
    try {
        const user = await UserService.create(userData)
        user.toObject()
        const response = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
            orders: user.orders
        }
    
        return handleResponse(res, 200, 'user  created successfully', response)
    } catch (error) {
        return handleResponse(res, error.status, error.message)
    }

}

export const getUser = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const id = req.params.id
        const user = await UserService.getOne(id)
        const response = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
            orders: user.orders
        }

        return handleResponse(res, 200, 'success', response)
    } catch (error) {
        return handleResponse(res, error.status, error.message)
    }
}