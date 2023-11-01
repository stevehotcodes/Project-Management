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
exports.getProjectByUserId = exports.getUnassignedProjects = exports.addNewProject = exports.getAllProjects = void 0;
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
    try {
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
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.addNewProject = addNewProject;
//fetch project by status 
const getUnassignedProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let projects = (yield dbInstance.exec('getUnassignedProjects')).recordset;
        return res.status(200).json(projects);
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
//   export const updateProjectToStart
