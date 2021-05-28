import {Request, Response} from "express"
import { handleResponse } from "../helpers/utils"
import OrderServices from "../services/orderServices"

export const createOrder = async (req:Request, res:Response) => {
    const data = {...req.body}

    try {
        const order =  await OrderServices.create(data)
        const response = {
            total_price: order.total_price,
            items: order.items,
            billing_address: order.billing_address
        }
        handleResponse(res, 200, "order created", response)
    } catch (error) {
        handleResponse(res, error.status, error.message)
    }

}

export const getOrder = async (req:Request, res:Response) => {
    const id = req.params.id
    try {
        const order = await OrderServices.getOne(id)
        const response = {
            total_price: order.total_price,
            items: order.items,
            billing_address: order.billing_address
        }
        handleResponse(res, 200, "success", response)

    } catch (error) {
        handleResponse(res, error.status, error.message)
    }
}