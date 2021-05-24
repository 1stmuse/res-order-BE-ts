import {Router} from 'express'
import {createUser, getUser} from '../controllers/userController'

const router:Router = Router()

router.get('/:id', getUser)
router.post('/', createUser)

export default router