import express from "express"
import { getAll, getSingle, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { validateProduct } from "../utils/validateProduct.js"; 
import upload from "../middleware/imageUpload.js";
const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", validateProduct, createProduct, upload.single("image"));
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;