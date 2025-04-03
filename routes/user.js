import express from "express"
import { getAll, getSingle, createUser, updateUser, deleteUser  } from "../controllers/userController";
import { validateUser } from "../middleware/validateUser";

const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", validateUser, createUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;