"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const userRouter = (0, express_1.Router)();
userRouter.post('/new', userControllers_1.registerNewUser);
userRouter.get('/unassigned', userControllers_1.getUnassignedUsers);
userRouter.get('/all', userControllers_1.getAllUser);
userRouter.patch('/login', userControllers_1.loginUser);
exports.default = userRouter;
