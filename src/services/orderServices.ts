import {isValidObjectId} from "mongoose"
import { createError } from "../helpers/errorCreator";
import Order from "../models/orderModel"


export default class OrderServices {


    static async create(order: any) {
        let savedOrder ;
        if(!isValidObjectId(order?.userId)) throw createError(400, "Invalid user Id");
        savedOrder = new Order(order)
        const data = await savedOrder.save()
        if(!data) throw createError(500, "couls not create order")
        return data

    }

    static async getOne (id:string) {
        let order ;
        if(!isValidObjectId(id)) throw createError(400, "Invalid order Id");
        order = await Order.findById(id)
        if(!order) throw createError(404, "other not found")
        return order

    }
}