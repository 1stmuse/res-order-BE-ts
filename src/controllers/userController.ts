import {Response, Request, NextFunction} from 'express'
import {handleResponse} from '../helpers/utils'

import User from '../models/userModel'

export const createUser = async (req:Request, res:Response, next:NextFunction)=>{
    const userData = {
        ...req.body
    }
    const userExist = await User.findOne({username: req.body.username})
    if(userExist) return handleResponse(res, 403, 'user already exist')

    const user = await new User(userData).save()
    if(!user) return handleResponse(res, 500, 'server error')

    user.toObject()
    delete user.__v
    delete user._id

    const response = {
        username: user.username
    }

    return handleResponse(res, 200, 'user created', response)

}

export const getUser = async (req:Request, res:Response, next:NextFunction) =>{
    const users = await User.find()
    return handleResponse(res, 200, 'success', users)
}