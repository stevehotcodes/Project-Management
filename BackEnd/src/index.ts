import  Express, { Request, Response, json }  from "express";
import { checkEnv } from "./config/dbConfig";
// import { dbConnectionService } from "./services/dbConnectionService";
import sql from "mssql"


const app = Express();
app.use(json())
const port =3000

app.get('/',(req:Request,res:Response)=>{
    
    res.send({message:"hey you got it bro.........."})


})



app.listen(port,()=>{
    console.log("hello I am connected to the server................running on this port", port);
})