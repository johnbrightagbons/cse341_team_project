import express from "express"
import { getAll, getSingle, createPayment, updatePayment, deletePayment} from "../controllers/paymentController.js";
import { validatePayment } from "../utils/validatePayment.js";
import { isAuthenticated} from "../middleware/authMiddleware.js" ;

const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", isAuthenticated, validatePayment, createPayment);
router.put("/:id",isAuthenticated,  validatePayment, updatePayment);
router.delete("/:id", isAuthenticated,  deletePayment);

export default router;