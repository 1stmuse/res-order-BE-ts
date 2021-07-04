import { isValidObjectId, ObjectId } from "mongoose"
import bcrypt from "bcrypt"
import User, { UModel, UserType } from "../models/userModel"
import { createError } from "../helpers/errorCreator"


export default class UserServices {

    static async create (data: UserType) {
            let user
            const userExist = await User.findOne({email: data.email})
            if(userExist) throw createError(400, "user already exist")
            user = new User(data)
            const newUser =  await user.save()
            if(!newUser) throw createError(500, "server error")

            return newUser
            
    }

    static async auth (data: Pick<UserType, "email" | "password">){
            
            const user: UModel | null = await User.findOne({email: data.email})
            if(!user) throw createError(400, "email or password incorrect")
            const password = bcrypt.compareSync(data.password, user.password)
            if(!password) throw createError(400, "email or password incorrect")

            return user

    }

    static async getOne (id: string) {
            if(!isValidObjectId(id)) throw createError(400, "Invalid user Id");
            const userFound = await User.findById(id)
            if(!userFound) throw createError(404, "User with that id does not Exist");
            return userFound

    }
}