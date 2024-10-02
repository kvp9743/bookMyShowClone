import express from "express";
import { getMyprofile, login, register } from "../Controller/userController.js";
import validateToken from "../Middleware/authmiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/getCurrentUser", validateToken, getMyprofile);

export default userRouter;
