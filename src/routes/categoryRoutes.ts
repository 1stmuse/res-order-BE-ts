import {Router} from "express"
import { createCategory, getCategory } from "../controllers/categoryController"
const router = Router()

router.get("/:id", getCategory)
router.post("/", createCategory)

export default router