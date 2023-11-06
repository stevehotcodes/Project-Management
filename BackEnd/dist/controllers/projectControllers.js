"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.getProjectById = exports.addProjectComment = exports.updateProjectToComplete = exports.updateProjectToInProgress = exports.updateProjectToAssigned = exports.getProjectByUserId = exports.getUnassignedProjects = exports.addNewProject = exports.getAllProjects = void 0;
const databaseConnectionHelper_1 = __importDefault(require("../helpers/databaseConnectionHelper"));
const uuid_1 = require("uuid");
const dbInstance = databaseConnectionHelper_1.default.getInstance();
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let projects = yield dbInstance.exec('getAllProjects');
        return res.status(200).json(projects);
    }
    catch (error) {
        return res.status(404).json({ message: "projects were not  found", error });
    }
});
exports.getAllProjects = getAllProjects;
const addNewProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (((_a = req.info) === null || _a === void 0 ? void 0 : _a.role) === 'admin') {
            let id = (0, uuid_1.v4)();
            let { projectTitle, projectDescription, projectDueDate } = req.body;
            const parts = projectDueDate.split('/');
            if (parts.length === 3) {
                projectDueDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
            else {
                return res.status(400).json({ message: "Invalid date format" });
            }
            let parsedDate = new Date(projectDueDate);
            projectDueDate = parsedDate;
            if (isNaN(projectDueDate)) {
                return res.status(400).json({ message: "Invalid date format" });
            }
            console.log(parsedDate);
            let result = yield dbInstance.exec('addNewProject', {
                id,
                projectTitle,
                projectDescription,
                projectDueDate,
            });
            console.log(result);
            return res.status(201).json({ message: `${projectTitle} created successfully` });
        }
        else {
            return res.status(401).json({ message: "you do not have privileges" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.addNewProject = addNewProject;
//fetch project by status 
const getUnassignedProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (((_b = req.info) === null || _b === void 0 ? void 0 : _b.role) === 'admin') {
            let projects = (yield dbInstance.exec('getUnassignedProjects')).recordset;
            if (!projects) {
                return res.status(404).json({ message: "no projects founnd" });
            }
            return res.status(200).json(projects);
        }
        else {
            return res.status(401).json({ message: "you do not have privileges" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: "projects were not  found", error });
    }
});
exports.getUnassignedProjects = getUnassignedProjects;
const getProjectByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let projects = (yield dbInstance.exec('getProjectsByUserId', { id })).recordset;
        return res.status(200).json(projects);
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.getProjectByUserId = getProjectByUserId;
const updateProjectToAssigned = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        if (((_c = req.info) === null || _c === void 0 ? void 0 : _c.role) === 'admin') {
            let { id, userID } = req.params;
            yield dbInstance.exec('updateProjectStatusToAssigned', { id, userID });
            return res.status(200).json("task assigned successfully");
        }
        else {
            return res.status(401).json({ message: "you do not have privileges" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.updateProjectToAssigned = updateProjectToAssigned;
const updateProjectToInProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let project = (yield dbInstance.exec('getProjectById', { id })).recordset[0];
        console.log(project);
        // const {projectStatus}=req.body
        if (!project) {
            return res.status(404).json({ message: "project not found" });
        }
        else {
            yield dbInstance.exec('updateProjectStatusToInProgress', { id });
            // return res.status(200).json(project)
            return res.status(200).json("task updated to in progress");
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "error in updating the task to in progress": error.message });
    }
});
exports.updateProjectToInProgress = updateProjectToInProgress;
const updateProjectToComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        let { id } = req.params;
        let userID = (_d = req.info) === null || _d === void 0 ? void 0 : _d.id;
        console.log(userID);
        console.log(userID);
        yield dbInstance.exec('updateProjectStatusToComplete', { id, userID: userID });
        return res.status(200).json("project marked to complete");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "error in updating the task to complete": error.message });
    }
});
exports.updateProjectToComplete = updateProjectToComplete;
const addProjectComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let { projectComments } = req.body;
        let result = yield dbInstance.exec('addProjectComments', { id, projectComments });
        console.log(result);
        return res.status(200).json({ message: "project comments were added successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.addProjectComment = addProjectComment;
//these are ment for assigning users tasks
//first fetch project by id
//prepopulate the data fetched to the form 
//fetch unassigned users 
//create an object that will submit the user assigned task to database 
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let project = (yield dbInstance.exec('getProjectById', { id })).recordset;
        console.log(project);
        if (!project) {
            return res.status(404).json({ message: "project not found" });
        }
        else {
            return res.status(200).json(project);
        }
    }
    catch (error) {
        return res.status(500).json({ "error in fetching project details": error.message });
    }
});
exports.getProjectById = getProjectById;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let project = (yield dbInstance.exec('getProjectById', { id })).recordset;
        console.log(project);
        if (!project) {
            return res.status(404).json({ message: "project not found" });
        }
        else {
            yield dbInstance.exec('deleteAProject', { id });
            return res.status(200).json({ message: `project deleted successfully` });
        }
    }
    catch (error) {
        return res.status(500).json({ "error in fetching project details": error.message });
    }
});
exports.deleteProject = deleteProject;
