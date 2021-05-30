import { Request, Response } from "express";
import { handleResponse } from "../helpers/utils";
import { productType } from "../models/productModel";
import ProductServices from "../services/ProductServices"

export const createProduct = async (req:Request, res:Response) => {
    const data = {...req.body}

    try {
        const product = await ProductServices.create(data)
        const response = {
            name: product.name,
            description: product.description,
            id: product._id,
            images: product.images,
            category: product.category,
            price: product.available,
            available: product.available,
            createdAt: product.createdAt
        }
        handleResponse(res, 200, "success", response)
    } catch (error) {
        handleResponse(res, error.error, error.message)
    }
}

export const getProduct = async (req:Request, res:Response) => {
    const id = req.params.id
    try {
        const product: productType = await ProductServices.getOne(id)
        const response = {
            name: product.name,
            description: product.description,
            id: product._id,
            images: product.images,
            category: product.category,
            price: product.available,
            available: product.available,
            createdAt: product.createdAt
        }
        handleResponse(res, 200, "success", response)
    } catch (error) {
        handleResponse(res, error.error, error.message)
    }
}

export const getProducts = async (req:Request, res:Response) => {
    try {
        const products: productType[] = await ProductServices.getAll()
        const response = products
        handleResponse(res, 200, "success", response)
    } catch (error) {
        handleResponse(res, error.error, error.message)
    }
}