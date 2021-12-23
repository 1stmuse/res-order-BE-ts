import { Request, response, Response } from "express";
import AddressService from "../services/AddressServices";
import { handleResponse } from "../helpers/utils";

export const addAddress = async (req: Request, res: Response) => {
  const data = { ...req.body };

  try {
    await AddressService.addAddress(data);

    handleResponse(res, 200, "added succesfuly");
  } catch (error) {
    handleResponse(res, error.status, error.message);
  }
};

export const getUserAddress = async (req: Request, res: Response) => {
  try {
    const id = res.locals?.userId;
    const data = await AddressService.getAddress(id);
    handleResponse(res, 200, "success", data);
  } catch (error) {
    handleResponse(res, error.status, error.message);
  }
};
