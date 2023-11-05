import  Express from "express";
import cron from 'node-cron'
import { completedUpdate} from "./services/emailService";

const app=Express()

const port =4200





const execute= async()=>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('Checking for a new user');
        
        await completedUpdate()
    })
    
}

execute()



app.listen(port,()=>{
    console.log("Background services running on port.....",port)
})

