import {Request, Response} from "express"
import { handleResponse } from "../helpers/utils"
import { orderTypes } from "../models/orderModel"
import OrderServices from "../services/orderServices"

export const createOrder = async (req:Request, res:Response) => {
    const data = {...req.body}

    try {
        const order: orderTypes =  await OrderServices.create(data)
        const response = {
            id: order._id,
            total_price: order.total_price,
            user: order.user,
            items: order.items,
            billing_address: order.billing_address,
            dateOrdered: order.dateOrdered
        }
        handleResponse(res, 200, "order created", response)
    } catch (error) {
        handleResponse(res, error.status, error.message)
    }

}

export const getOrder = async (req:Request, res:Response) => {
    const id = req.params.id
    try {
        const order: orderTypes = await OrderServices.getOne(id)
        const response = {
            user: order.user,
            id:order._id,
            total_price: order.total_price,
            items: order.items,
            billing_address: order.billing_address,
            dateOrdered: order.dateOrdered
        }
        handleResponse(res, 200, "success", response)

    } catch (error) {
        handleResponse(res, error.status, error.message)
    }
}