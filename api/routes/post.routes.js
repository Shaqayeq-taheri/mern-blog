import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import {createPost, getAllPosts} from '../controllers/post.controller.js'


const router = express.Router()

router.post('/create-post', verifyToken, createPost)
router.get('/allPosts', getAllPosts)

export default router