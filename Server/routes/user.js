import express from "express"
import { postRegister, postLogin } from "../controllers/UserController.js";

const userRouter = express.Router();

// Register
userRouter.post("/register", postRegister);

// Login
userRouter.post("/login", postLogin);

export { userRouter };
