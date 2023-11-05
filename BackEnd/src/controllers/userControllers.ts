import { Request, Response } from "express";
import { dbConnectService } from "../services/dbConnectionService";
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import DatabaseHelper from "../helpers/databaseConnectionHelper";
import { IUnassignedUser, IUser, IuserPayLoad } from "../Types";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({path:"./env"})




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
        let users:IUser[]=(await db.exec('getAllUsers')).recordset
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

  
export const loginUser=async (req:Request,res:Response)=>{
    try {
      //input from the user
      let {email,password}=req.body;
      
      //fetch data form the 
      let user:IUser=(await db.exec('getUserEmail',{email,password})).recordset[0];
        
      //compare with user input 
      if (user.email==email){
        
        const passwordDb=await bcrypt.compare(password,user.password)
        if(!passwordDb){
            return res.status(401).json("Incorrect password")
        }
        const userPayload= {'id': user.id, 'fullname':user.fullname, 'email':user.email, 'role':user.role} 
      
        const token = jwt.sign(userPayload, process.env.SECRET as string, {
            expiresIn: '36000s'
        })
        
        return res.status(200).json({
            message: "Logged in successfully", token
        })

      }
      else{
        console.log("email not found")
        return res.status(404).json({message :"email not found"})
      }

    } catch (error:any) {
        
       return res.status(500).json({error:error.message})
    }
  }

  export const getUnassignedUsers=async(req:Request,res:Response)=>{
        try {
              let unAssignedUsers:IUnassignedUser[]=(await db.exec('getUnAssignedUsers')).recordset
                if(!unAssignedUsers){
                     return res.status(404).json({"message":"not assigned found"})
                };
              return res.status(200).json(unAssignedUsers)
            
        } catch (error:any) {
            console.log(error)
            return res.status(500).json({"error in fetching unassigned users":error.message})
        }
  }