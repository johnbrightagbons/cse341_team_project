import express from "express"
import { getAll, getSingle, createUser, updateUser, deleteUser  } from "../controllers/userController.js";
import { validateUser } from "../utils/validateUser.js";
import { isAuthenticated} from "../middleware/authenticate.js" ;

const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", isAuthenticated, validateUser, createUser);
router.put("/:id", isAuthenticated, validateUser, updateUser);
router.delete("/:id", isAuthenticated, deleteUser);

export default router;