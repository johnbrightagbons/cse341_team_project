import express from "express"
import { getAll, getSingle, createUser, updateUser, deleteUser  } from "../controllers/userController.js";
import { validateUser } from "../middleware/validateUser.js";

const  userRouter = express.Router();

userRouter.get("/", getAll);
userRouter.get("/:id", getSingle);
userRouter.post("/", validateUser, createUser);
userRouter.put("/:id", validateUser, updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;