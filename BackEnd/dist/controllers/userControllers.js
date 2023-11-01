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
exports.getUserById = exports.getAllUser = exports.registerNewUser = void 0;
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const databaseConnectionHelper_1 = __importDefault(require("../helpers/databaseConnectionHelper"));
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
