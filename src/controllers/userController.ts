import {Response, Request, NextFunction} from 'express'
import {handleResponse} from '../helpers/utils'
import UserService from "../services/UserService"

export const createUser = async (req:Request, res:Response, next:NextFunction)=>{
    const userData = {
        ...req.body
    }
    
    try {
        const user = await UserService.createUser(userData)
        user.toObject()
        const savedUser = {
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number
        }
        const response = {
            user: savedUser
        }
    
        return handleResponse(res, 200, 'user  created successfully', response)
    } catch (error) {
        return handleResponse(res, 500, error.message)
    }

}

export const getUser = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const id = req.params.id
        const users = await UserService.getUserById(id)
        return handleResponse(res, 200, 'success', users)
    } catch (error) {
        // console.log(error)
        return handleResponse(res, 400, error.message)
    }
}