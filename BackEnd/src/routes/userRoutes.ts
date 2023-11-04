import { Router } from "express";
import { getAllUser, getUnassignedUsers, loginUser, registerNewUser } from "../controllers/userControllers";
import { verifyToken } from "../middlewares/verifyToken";


const userRouter=Router()


userRouter.post('/new',registerNewUser);
userRouter.get('/unassigned',getUnassignedUsers)
userRouter.get('/all',getAllUser);
userRouter.patch('/login',loginUser);





export default userRouter