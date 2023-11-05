import  Express from "express";


const app=Express()

const port =4200

app.listen(port,()=>{
    console.log("Background services running on port.....",port)
})

