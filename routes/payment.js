import express from "express"
import { getAll, getSingle, createPayment, updatePayment, deletePayment} from "../controllers/paymentController";
import { validatePayment } from "../middleware/validatePayment";

const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", validatePayment, createPayment);
router.put("/:id", validatePayment, updatePayment);
router.delete("/:id", deletePayment);

export default router;