import { isValidObjectId, ObjectId } from "mongoose"
import User, { UserType } from "../models/userModel"


export default class UserServices {

    static async createUser (data: UserType) {
        try {
            let user
            const userExist = await User.findOne({email: data.email})
            if(userExist) throw new Error("user already exist")
            user = new User(data)
            const newUser =  await user.save()
            return newUser
            
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getUserById (id: string) {
        try {
            if(!isValidObjectId(id)) throw new Error("Invalid user Id");
            const userFound = await User.findById(id)
            if(!userFound) throw new Error("User with that id does not Exist");
            return userFound
        } catch (error) {
            throw new Error(error);
            
        }

    }
}