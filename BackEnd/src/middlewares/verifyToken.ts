import dotenv from 'dotenv'
dotenv.config()
import jwt, { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
import { IUser, IdecodedData } from '../Types';

export interface ExtendedUserRequest extends Request{
    info?:IdecodedData
}



export const verifyToken=async(req:ExtendedUserRequest,res:Response,next:NextFunction)=>{
    try {
        
        const token=req.headers['token'] as string
        if(!token){
            return res.status(401).json({message:"Unauthorised"})
        }
        const data=jwt.verify(token ,process.env.SECRET as string) as IdecodedData
        req.info=data
        console.log(data)
        
    } 
    catch (error) {
            return res.json({
                message: error
            })
        
    
    }
    next()
} 

