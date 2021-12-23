import { Router } from "express";
import { addAddress, getUserAddress } from "../controllers/addressControler";
import auth from "../middlewares/auth_middleware";

const router = Router();

router.get("/", auth, getUserAddress);
router.post("/", auth, addAddress);

export default router;
