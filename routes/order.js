import express from "express"
import { getAll, getSingle, createOrder, updateOrder, deleteOrder} from "../controllers/orderController.js";
import { validateOrder } from "../utils/validateOrder.js";
import { isAuthenticated} from "../middleware/authenticate.js" ;
const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", isAuthenticated, validateOrder, createOrder);
router.put("/:id", validateOrder, isAuthenticated,  updateOrder);
router.delete("/:id", isAuthenticated, deleteOrder);

export default router;