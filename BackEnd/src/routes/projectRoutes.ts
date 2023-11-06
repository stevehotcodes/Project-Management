import { Router } from "express";
import { addNewProject, addProjectComment, deleteProject, getAllProjects, getProjectById, getProjectByUserId, getUnassignedProjects, updateProjectToAssigned, updateProjectToComplete, updateProjectToInProgress } from "../controllers/projectControllers";
import { verifyToken } from "../middlewares/verifyToken";

const projectRoutes=Router();


projectRoutes.get('/all',getAllProjects)
projectRoutes.post('/new',verifyToken,addNewProject)
projectRoutes.get('/unassigned',verifyToken,getUnassignedProjects);
projectRoutes.get('/:userID',verifyToken,getProjectByUserId);
projectRoutes.delete('/:id', verifyToken,deleteProject)
projectRoutes.get('/one/:id',verifyToken,getProjectById)
projectRoutes.patch('/inprogress/:id',updateProjectToInProgress);
projectRoutes.put('/comments/:id', addProjectComment)
projectRoutes.put('/completed/:id/:userID',verifyToken,updateProjectToComplete)
projectRoutes.patch('/assignProject/:id/:userID',updateProjectToAssigned)


export default projectRoutes