import express from 'express'
import superAdminGuard from '../midlleware/AdminGuard.js'
import UserController from '../controller/user.js'
const router = express.Router()

router.post('/create',superAdminGuard,UserController.signUp)
router.post('/login',UserController.login)
router.get('/',superAdminGuard,UserController.getAllUsers)
router.get('/:id',superAdminGuard,UserController.getUserById)

export default router