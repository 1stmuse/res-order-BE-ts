import { Router } from "express";
import {
  createCategory,
  getCategory,
  getAllCategories,
} from "../controllers/categoryController";
const router = Router();

router.get("/:id", getCategory);
router.post("/", createCategory);
router.get("/", getAllCategories);

export default router;
