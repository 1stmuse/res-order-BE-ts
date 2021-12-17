import { isValidObjectId } from "mongoose";
import { createError } from "../helpers/errorCreator";
import Product from "../models/productModel";

export default class ProductServices {
  static async create(data: any) {
    let product;
    product = new Product(data);

    await product.save();
    if (!product) throw createError(500, "could not create product");
    return product;
  }

  static async getOne(id: string) {
    if (!isValidObjectId(id)) throw createError(400, "invalid product ID");
    let product;
    product = await Product.findById(id).populate("category", "name");
    if (!product) throw createError(404, "could not get product");

    return product;
  }

  static async getAll() {
    let products;
    products = await Product.find();
    if (!products) throw createError(404, "could not get product");

    return products;
  }
}
