import { Response, Request } from "express";
import Jwt from "jsonwebtoken";
import { handleResponse, sendOTP } from "../helpers/utils";
import { UserType, UModel } from "../models/userModel";
import { createError } from "../helpers/errorCreator";
import UserServices from "../services/UserService";

export const createUser = async (req: Request, res: Response) => {
  const userData = {
    ...req.body,
  };
  try {
    const user: UModel = await UserServices.create(userData);
    user.toObject();

    return handleResponse(res, 200, "user  created successfully");
  } catch (error) {
    return handleResponse(res, error?.status ?? 500, error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const data = { ...req.body };

  try {
    const user = await UserServices.auth(data);
    user.generateToken(user._id, (token) => {
      if (data == null)
        throw createError(500, "something went wrong, try again");

      return handleResponse(res, 200, "success", null, token);
    });
  } catch (error) {
    return handleResponse(res, error?.status ?? 500, error.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = res.locals?.userId;
    const user: UModel = await UserServices.getOne(id);

    const response = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone_number: user.phone_number,
    };

    return handleResponse(res, 200, "success", response);
  } catch (error) {
    return handleResponse(res, error?.status ?? 500, error.message);
  }
};

export const resetPasswordOtp = async (req: Request, res: Response) => {
  const phone = req.body.phone;
  const id: string = res.locals.userId;
  try {
    console.log(id);
    const user: UModel = await UserServices.getOne(id);
    if (user.phone_number !== phone)
      throw createError(400, "phone number does not match user number");
    const opt = Math.floor(10000 + Math.random() * 90000);
    sendOTP(`+234${user.phone_number}`, opt)
      .then((message) => {
        user.createOtp(`${opt}`);
        return handleResponse(res, 200, "success");
      })
      .catch((err) => {
        if (err) return handleResponse(res, 400, err.message);
      });
  } catch (error) {
    return handleResponse(res, error?.status ?? 500, error.message);
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const otp = req.body.otp;
  const id: string = res.locals.userId;
  try {
    const user: UModel = await UserServices.getOne(id);
    if (user.reset_otp !== otp)
      return handleResponse(res, 400, "wrong otp provided");

    const now = new Date().getMinutes();
    if (user.otp_expires! < now)
      return handleResponse(res, 400, "opt exxpired");
    return handleResponse(res, 200, "success");
  } catch (error) {
    return handleResponse(res, error?.status ?? 500, error.message);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const newPassword = req.body.password;
  const id: string = res.locals.userId;
  try {
    const user: UModel = await UserServices.getOne(id);
    user.resetPassword(newPassword);

    return handleResponse(res, 200, "success");
  } catch (error) {
    return handleResponse(res, error?.status ?? 500, error.message);
  }
};
