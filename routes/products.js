import express from "express"
import { getAll, getSingle, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { validateProduct } from "../utils/validateProduct.js"; 
import upload from "../middleware/imageUpload.js";
import { isAuthenticated} from "../middleware/authMiddleware.js" ;
const  router = express.Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", isAuthenticated, validateProduct, createProduct, upload.single("image"));
router.put("/:id", isAuthenticated,  validateProduct, updateProduct);
router.delete("/:id", isAuthenticated,  deleteProduct);

export default router;