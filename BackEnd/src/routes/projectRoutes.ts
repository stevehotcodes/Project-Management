import { Router } from "express";
import { addNewProject, getAllProjects, getProjectByUserId, getUnassignedProjects } from "../controllers/projectControllers";

const projectRoutes=Router();


projectRoutes.get('/all',getAllProjects)
projectRoutes.post('/new',addNewProject)
projectRoutes.get('/unassigned',getUnassignedProjects);
projectRoutes.get('/:userID',getProjectByUserId)



export default projectRoutes