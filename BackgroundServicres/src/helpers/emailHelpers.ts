import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { mailConfig } from '../types/mailinterface'
dotenv.config()


const createTransport=(config:mailConfig)=>{
    const transporter=nodemailer.createTransport(config)
    return transporter
}
let configurations: mailConfig = ({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL as string ,
        pass: process.env.PASSWORD  as string
    }
})

export const sendMail = async(messageOption: any)=>{
    const transporter = await createTransport(configurations)

    await transporter.verify()

    await transporter.sendMail(messageOption, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log(info.response); 
        }
    })
}



