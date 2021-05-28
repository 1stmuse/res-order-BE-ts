import { Router } from "express"
import { createOrder, getOrder } from "../controllers/orderController"

const router: Router = Router()

router.get("/:id", getOrder)
router.post("/", createOrder)

export default router