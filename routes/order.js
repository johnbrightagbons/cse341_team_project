import express from "express"
import { getAll, getSingle, createOrder, updateOrder, deleteOrder} from "../controllers/orderController";
import { validateOrder } from "../middleware/validateOrder";

const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", validateOrder, createOrder);
router.put("/:id", validateOrder, updateOrder);
router.delete("/:id", deleteOrder);

export default router;