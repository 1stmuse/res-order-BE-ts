import {Router} from 'express'
import {createUser, getUser, login, resetPasswordOtp, verifyOtp, resetPassword} from '../controllers/userController'
import auth from "../middlewares/auth_middleware"

const router:Router = Router()

router.get('/:id', getUser)
router.post('/auth', login)
router.post('/verifyOtp', auth, verifyOtp)
router.post("/resetPasswordOtp", auth ,resetPasswordOtp)
router.post("/resetPassword", auth, resetPassword)
router.post('/', createUser)

export default router