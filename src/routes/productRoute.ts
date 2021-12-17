import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
} from "../controllers/productController";
import auth from "../middlewares/auth_middleware";
const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", auth, createProduct);

export default router;
