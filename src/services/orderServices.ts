import {isValidObjectId, ObjectId} from "mongoose"
import { createError } from "../helpers/errorCreator";
import Order from "../models/orderModel"


export default class OrderServices {


    static async create(order: any) {
        let savedOrder ;
        if(!isValidObjectId(order?.user)) throw createError(400, "Invalid user Id");
        savedOrder = new Order(order)
        const data = await savedOrder.save()
        if(!data) throw createError(400, "couls not create order")
        return data

    }

    static async getUserOrders (id:string) {
        let order ;
        if(!isValidObjectId(id)) throw createError(400, "Invalid order Id");
        order = await Order.find({user: Object(id)}).populate("user", "fullname")
        if(!order) throw createError(404, "other not found")
        return order

    }

    static async getAllOrder () {
        const orders = await Order.find().populate("user", "fullname")
        if(!orders) throw createError(500, "internal server Error")
        return orders
    }
}