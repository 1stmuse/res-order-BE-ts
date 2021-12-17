import mongoose, { Schema, Document, ObjectId } from "mongoose";
import * as bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { orderTypes } from "./orderModel";

dotenv.config();

export interface UserType {
  fullname: string;
  password: string;
  email: string;
  phone_number: string;
  reset_otp?: string;
  otp_expires?: number;
}

export interface UModel extends UserType, Document {
  generateToken: (token: string, cb: (data: string) => void) => void;
  createOtp: (opt: string) => void;
  resetPassword: (pass: string) => void;
}

export const UserSchema: Schema<UModel> = new Schema(
  {
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    reset_otp: { type: String, default: "" },
    otp_expires: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserSchema.pre<UModel>("save", function (this: UModel, next: any) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.generateToken = function (userId, cb) {
  Jwt.sign(
    { id: userId },
    `${process.env.JWT_SECRET}`,
    (err: Error | null, token: string | undefined) => {
      if (err) cb(null);
      cb(token);
    }
  );
};

UserSchema.methods.createOtp = function (otp) {
  var user = this;
  const today = new Date();
  const future = today.getMinutes() + 1;
  user.reset_otp = otp;
  user.otp_expires = future;
  user.save();
};

UserSchema.methods.resetPassword = function (pass) {
  var user = this;
  user.password = pass;
  user.otp_expires = 0;
  user.reset_otp = "";
  user.save();
};

export default mongoose.model<UModel>("user", UserSchema);
