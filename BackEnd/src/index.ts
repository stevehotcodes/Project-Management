import  Express, { Request, Response, Router, json }  from "express";
import { dbConfig } from "./config/dbConfig";
// import { dbConnectionService } from "./services/dbConnectionService";
import sql from "mssql"
import { dbConnectService } from "./services/dbConnectionService";
import userRouter from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import cors from 'cors'

const app = Express();
app.use(cors())
app.use(json())

const port =3000



app.use('/user',userRouter);
app.use('/projects',projectRoutes);
app.get('/',()=>{
    console.log("perez changes")
})

app.listen(port,()=>{
    console.log("hello I am connected to the server................running on this port", port);
})