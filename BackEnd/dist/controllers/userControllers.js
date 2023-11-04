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
exports.getUnassignedUsers = exports.loginUser = exports.getUserById = exports.getAllUser = exports.registerNewUser = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const databaseConnectionHelper_1 = __importDefault(require("../helpers/databaseConnectionHelper"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./env" });
const db = databaseConnectionHelper_1.default.getInstance();
function filterUserInfo(users) {
    users.map((user) => {
        delete user.password; // do not return passwords for users
    });
}
const registerNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        let { fullName, email, password } = req.body;
        password = yield bcrypt_1.default.hash(password, 10);
        // let pool=await dbConnectService()
        yield db.exec('addUser', { id, fullName, email, password });
        // pool?.connected? console.log("Db connected successfully"):""
        return res.status(201).json({ message: `User <${email}> has been registered successfully. Your ID is ${id}` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ messsage: error });
    }
});
exports.registerNewUser = registerNewUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = (yield db.exec('getAllUsers')).recordset;
        filterUserInfo(users);
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(404).json({ message: "no users found", error });
    }
});
exports.getAllUser = getAllUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
    }
    catch (error) {
    }
});
exports.getUserById = getUserById;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //input from the user
        let { email, password } = req.body;
        //fetch data form the 
        let user = (yield db.exec('getUserEmail', { email, password })).recordset[0];
        //compare with user input 
        if (user.email == email) {
            const passwordDb = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordDb) {
                return res.status(401).json("Incorrect password");
            }
            const userPayload = { 'id': user.id, 'fullname': user.fullname, 'email': user.email, 'role': user.role };
            const token = jsonwebtoken_1.default.sign(userPayload, process.env.SECRET, {
                expiresIn: '36000s'
            });
            return res.status(200).json({
                message: "Logged in successfully", token
            });
        }
        else {
            console.log("email not found");
            return res.status(404).json({ message: "email not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
const getUnassignedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let unAssignedUsers = (yield db.exec('getUnAssignedUsers')).recordset;
        if (!unAssignedUsers) {
            return res.status(404).json({ "message": "not assigned found" });
        }
        ;
        return res.status(200).json(unAssignedUsers);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "error in fetching unassigned users": error.message });
    }
});
exports.getUnassignedUsers = getUnassignedUsers;
