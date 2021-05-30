import {Request, Response} from "express"
import { handleResponse } from "../helpers/utils"
import { categoryType } from "../models/categoryModel"
import CategoryServices from "../services/CategoryServices"

export const createCategory = async (req:Request, res:Response) =>{
    const data = {...req.body}

    try {
        const cat: categoryType = await CategoryServices.create(data)
        const response = {
            name: cat.name,
            id: cat._id
        }
        handleResponse(res, 200, "sucess", response)
    } catch (error) {
        handleResponse(res, error.status, error.message)
    }

}

export const getCategory = async (req:Request, res:Response) => {
    const id = req.params.id
    try {
        const cat: categoryType = await CategoryServices.getOne(id)
        const response = {
            name: cat.name,
            id: cat._id
        }
        handleResponse(res, 200, "sucess", response)
    } catch (error) {
        handleResponse(res, error.status, error.message)
    }
}