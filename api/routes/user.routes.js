import express from 'express'
import {getAllUsers, updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/allUsers', getAllUsers)
router.put('/update/:userId',  verifyToken,updateUser)

export default router