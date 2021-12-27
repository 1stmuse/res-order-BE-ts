import Address from "../models/addressModel";
import { createError } from "../helpers/errorCreator";

export default class AddressServices {
  static async addAddress(data: any) {
    let address;
    const itExist = await Address.findOne({ name: data?.name });

    if (itExist) throw createError(404, "address already Exist");
    address = new Address(data);
    address = await address.save();
    if (!address) throw createError(500, "internal server error");
    return true;
  }

  static async getAddress(id: string) {
    let address;

    address = await Address.find({ userId: id });
    if (!address) throw createError(400, "user address not found");

    return address;
  }
}
