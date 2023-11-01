import { Request,Response, request } from "express";
import DatabaseHelper from "../helpers/databaseConnectionHelper";
import  {v4 as uid }from 'uuid'


const dbInstance= DatabaseHelper.getInstance()


export const getAllProjects=async(req:Request,res:Response)=>{

  try {
    let projects=await dbInstance.exec('getAllProjects');
    return res.status(200).json(projects); 
    
  } catch (error) {
    return res.status(404).json({message:"projects were not  found",error})

    
  }


}

export const addNewProject = async (req:Request, res:Response) => {
    try {
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
    } catch (error:any) {
      return res.status(500).json({ message: error.message });
    }
  };

//fetch project by status 

export const getUnassignedProjects=async(req:Request,res:Response)=>{

    try {
      let projects=(await dbInstance.exec('getUnassignedProjects')).recordset;
      return res.status(200).json(projects); 
      
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

  
  
//   export const updateProjectToStart

