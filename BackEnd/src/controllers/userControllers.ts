import { Request, Response } from "express";
import { dbConnectService } from "../services/dbConnectionService";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import DatabaseHelper from "../helpers/databaseConnectionHelper";
import { IUser } from "../Types";





const db = DatabaseHelper.getInstance()


function filterUserInfo(users:IUser[]) {
    users.map((user:Partial<IUser>)=>{
        delete user.password // do not return passwords for users
        
    })
}

export const registerNewUser=async (req:Request,res:Response)=>{
    try {
        let id=uid()
        let {fullName,email, password}=req.body
        password= await bcrypt.hash(password,10);

    

        // let pool=await dbConnectService()
        await db.exec('addUser', {id,fullName, email, password})
        // pool?.connected? console.log("Db connected successfully"):""
        return res.status(201).json({message:`User <${email}> has been registered successfully. Your ID is ${id}`})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({messsage:error})
    }
}

export const getAllUser =async(req:Request, res:Response)=>{
    try {
        let users=(await db.exec('getAllUsers')).recordset
        filterUserInfo(users)
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({message:"no users found",error})
    }
}

export const  getUserById=async (req:Request,res:Response)=>{
    try {
        let {id}=req.params;
        
        
    } catch (error) {
        
    }
}