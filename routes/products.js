import express from "express"
import { getAll, getSingle, createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { validateProduct } from "../middleware/validateProduct";

const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", validateProduct, createProduct);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;