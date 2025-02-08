import { registerUser, loginUser, buyCredit, AddCredit } from "../controllers/userController.js";
import express from "express";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/add-credit",userAuth, AddCredit);
userRouter.get("/credit",userAuth, buyCredit);

export default userRouter;
