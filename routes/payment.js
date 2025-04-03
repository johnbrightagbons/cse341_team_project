import express from "express"
import { getAll, getSingle, createPayment, updatePayment, deletePayment} from "../controllers/paymentController.js";
import { validatePayment } from "../middleware/validatePayment.js";

const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", validatePayment, createPayment);
router.put("/:id", validatePayment, updatePayment);
router.delete("/:id", deletePayment);

export default router;