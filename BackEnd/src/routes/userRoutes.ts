import { Router } from "express";
import { getAllUser, registerNewUser } from "../controllers/userControllers";


const userRouter=Router()


userRouter.post('/new',registerNewUser)
userRouter.get('/all',getAllUser)



export default userRouter