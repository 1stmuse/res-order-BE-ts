import {Router} from 'express'
import {createUser, getUser, login, resetPassword, verifyOtp} from '../controllers/userController'
import auth from "../middlewares/auth_middleware"

const router:Router = Router()

router.get('/:id', getUser)
router.post('/auth', login)
router.post('/verifyOtp', auth, verifyOtp)
router.post("/resetPassword", auth ,resetPassword)
router.post('/', createUser)

export default router