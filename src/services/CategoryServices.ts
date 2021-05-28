import {isValidObjectId} from "mongoose"
import { createError } from "../helpers/errorCreator";
import Category from "../models/categoryModel"

export default class CategoryServices {

    static async create (data: any) {
        let cat ;
        const isExist = await Category.findOne({name: data.name})
        if(isExist) throw createError(400, "category already exist")
        cat = new Category(data)
        await cat.save()
        if(!cat) throw createError(500, "could not create categroy")
        return cat
    }

    static async getOne (id:string){
        if(isValidObjectId(id)) throw createError(400, "invalid category id")
        let cat;
        cat = await Category.findById(id)
        if(!cat) throw createError(404, "category not found")
        return cat
    }
}