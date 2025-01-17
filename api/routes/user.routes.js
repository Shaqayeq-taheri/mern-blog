import express from 'express'
import {getAllUsers, updateUser, deleteUser,signout} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/allUsers', getAllUsers)
router.put('/update/:userId',  verifyToken,updateUser)
router.delete('/deleteUser/:userId', verifyToken, deleteUser)
router.post('/signout', signout)

export default router