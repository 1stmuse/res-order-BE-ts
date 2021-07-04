import * as dotenv from "dotenv"
import {Response} from 'express'
import {Twilio} from "twilio";

dotenv.config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phone = process.env.TWILIO_NUMBER

const client = new Twilio(`${accountSid}`, `${authToken}`)

export const handleResponse = (res:Response, statusCode:number, message:string, data?:any, token?:string)=>{
    return res.status(statusCode).json({
        message,
        data,
        token
    })
}

export const sendOTP = async (to: string, otp:number) => {
    return client.messages.create({
        body: `Your OTP is ${otp}, it expires in 1 minute`,
        from: `${phone}`,
        to: to
    })
}