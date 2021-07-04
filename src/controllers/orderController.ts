import {Request, Response} from "express"
import { handleResponse } from "../helpers/utils"
import { orderDoc, orderTypes } from "../models/orderModel"
import OrderServices from "../services/orderServices"

export const createOrder = async (req:Request, res:Response) => {
    const data  = {
        user: req.body.userId,
        total_price: req.body.total_price,
        status: "Pending",
        dateOrdered: Date.now().toString(),
        billing_address: req.body.billing_address,
        items: req.body.items
    }

    try {
        const order: orderDoc =  await OrderServices.create(data)
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

export const getUserOrders = async (req:Request, res:Response) => {
    const id = req.params.userId
    try {
        const order: orderDoc[] = await OrderServices.getUserOrders(id)
        const response = order.map((or) => (
            {
                user:or.user.fullname,
                userId: or.user._id,
                id:or._id,
                total_price: or.total_price,
                items: or.items,
                billing_address: or.billing_address,
                dateOrdered: or.dateOrdered
            }
        ))
        handleResponse(res, 200, "success", response)

    } catch (error) {
        handleResponse(res, error.status, error.message)
    }
}

export const getAllOrder = async (req:Request, res:Response) => {

    try {
        const orders: orderDoc[] = await OrderServices.getAllOrder()
        const response = orders.map((or) => (
            {
                user:or.user.fullname,
                userId: or.user._id,
                id:or._id,
                total_price: or.total_price,
                items: or.items,
                billing_address: or.billing_address,
                dateOrdered: or.dateOrdered
            }
        ))
        handleResponse(res, 200, "success", response)
    } catch (error) {
        handleResponse(res, error.status, error.message)
    }


}