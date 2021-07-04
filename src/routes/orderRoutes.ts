import { Router } from "express"
import { createOrder, getUserOrders, getAllOrder } from "../controllers/orderController"

const router: Router = Router()

router.get("/", getAllOrder)
router.get("/:userId", getUserOrders)
router.post("/", createOrder)

export default router