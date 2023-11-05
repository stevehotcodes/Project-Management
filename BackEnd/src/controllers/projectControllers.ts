import { Request,Response, request } from "express";
import DatabaseHelper from "../helpers/databaseConnectionHelper";
import  {v4 as uid }from 'uuid'
import { ILoginUser, IProject } from "../Types";
import { ExtendedUserRequest } from "../middlewares/verifyToken";


const dbInstance= DatabaseHelper.getInstance()


export const getAllProjects=async(req:Request,res:Response)=>{

  try {
    let projects=await dbInstance.exec('getAllProjects');
    return res.status(200).json(projects); 
    
  } catch (error) {
    return res.status(404).json({message:"projects were not  found",error})
  }

}

export const addNewProject = async (req:ExtendedUserRequest, res:Response) => {
    try {
      if(req.info?.role==='admin'){

        let id = uid();
        let { projectTitle, projectDescription, projectDueDate } = req.body;
    
       
        const parts = projectDueDate.split('/');
        if (parts.length === 3) {
          projectDueDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        } else {
          return res.status(400).json({ message: "Invalid date format" });
        }
    
        
        let parsedDate = new Date(projectDueDate);
        projectDueDate=parsedDate
    
      
        if (isNaN(projectDueDate)) {
          return res.status(400).json({ message: "Invalid date format" });
        }
    
        console.log(parsedDate);
    
        let result = await dbInstance.exec('addNewProject', {
            id,
            projectTitle,
            projectDescription,
            projectDueDate,
        });
        console.log(result);
        return res.status(201).json({ message: `${projectTitle} created successfully` });

      }
      else{
        return res.status(401).json({message:"you do not have privileges"})
      }
   
    } catch (error:any) {
      return res.status(500).json({ message: error.message });
    }
  };

//fetch project by status 

export const getUnassignedProjects=async(req:ExtendedUserRequest,res:Response)=>{

    try {
      if(req.info?.role==='admin'){
          let projects=(await dbInstance.exec('getUnassignedProjects')).recordset;
        if(!projects){return res.status(404).json({message:"no projects founnd"})}
        return res.status(200).json(projects); 
      }
      else{
        return res.status(401).json({message:"you do not have privileges"})
      }   

    } catch (error) {
      return res.status(404).json({message:"projects were not  found",error})
        
    }
  
  }

  export const getProjectByUserId=async(req:Request,res:Response)=>{

    try
     {
      
        let {id}=req.params
      let projects=(await dbInstance.exec('getProjectsByUserId',{id})).recordset;
      return res.status(200).json(projects); 
      
    } catch (error:any) {
       return res.status(404).json({message:error.message})
        
    }
    
  }
  
  export const updateProjectToAssigned=async(req:ExtendedUserRequest,res:Response)=>{
        try {
          if(req.info?.role==='admin'){
            let {id,userID}=req.params;
            await dbInstance.exec('updateProjectStatusToAssigned',{id,userID})

            return res.status(200).json("task assigned successfully");
          }
          else{
            return res.status(401).json({message:"you do not have privileges"})
          }
           
        } catch (error) {
          console.log(error)
           return res.status(500).json(error)
        }
  }

  export const updateProjectToInProgress=async(req:Request,res:Response)=>{
      try{
          
          let{id}=req.params;
          let project:IProject=(await dbInstance.exec('getProjectById',{id})).recordset[0];

          console.log(project)
          // const {projectStatus}=req.body
         

          if(!project){return res.status(404).json({message:"project not found"})}

          else{
            await dbInstance.exec('updateProjectStatusToInProgress',{id})
            
            // return res.status(200).json(project)
            return res.status(200).json("task updated to in progress");
          
        }
          
      
       

        


      }
      catch(error:any){
        console.log(error);
        return res.status(500).json({"error in updating the task to in progress":error.message})

      }
  }

  export const updateProjectToComplete=async(req:ExtendedUserRequest,res:Response)=>{
    try{
        
      let {id}=req.params;
      let userID=req.info?.id as string
      console.log(userID)
    
      
      console.log(userID)

      await dbInstance.exec('updateProjectStatusToComplete',{id,userID:userID});

      return res.status(200).json("project marked to complete");


    }
    catch(error:any){
      console.log(error);
      return res.status(500).json({"error in updating the task to complete":error.message})

    }
}



export const addProjectComment=async(req:Request,res:Response)=>{
    try {
        let{id}=req.params;
        let{projectComments}=req.body

        let result =await dbInstance.exec('addProjectComments',{id,projectComments});
        console.log(result);

        return res.status(200).json({message:"project comments were added successfully"})


   } catch (error:any) {
        return res.status(500).json({error:error.message})
      
    }
}

//these are ment for assigning users tasks
//first fetch project by id
//prepopulate the data fetched to the form 
//fetch unassigned users 
//create an object that will submit the user assigned task to database 

export const getProjectById=async (req:Request,res:Response)=>{
  try {

      let{id}=req.params;
      let project:IProject[]=(await dbInstance.exec('getProjectById',{id})).recordset;
      console.log(project)
      if(!project){return res.status(404).json({message:"project not found"})}
      else{
        return res.status(200).json(project)
      }
    
  } catch (error:any) {
      return res.status(500).json({"error in fetching project details":error.message})
    
  }

}

export const deleteProject=async (req:Request,res:Response)=>{
  try {

      let{id}=req.params;
      let project:IProject[]=(await dbInstance.exec('getProjectById',{id})).recordset;
      console.log(project)
      if(!project){return res.status(404).json({message:"project not found"})}
      else{
        await dbInstance.exec('deleteAProject',{id})
        return res.status(200).json({message:`project deleted successfully`});
      }
    
  } catch (error:any) {
      return res.status(500).json({"error in fetching project details":error.message})
    
  }

}
