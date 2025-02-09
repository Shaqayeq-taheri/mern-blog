import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import {createPost, getAllPosts, deletePost,updatePost} from '../controllers/post.controller.js'



const router = express.Router()

router.post('/create-post', verifyToken, createPost)
router.get('/allPosts', getAllPosts)
router.delete('/delete-post/:postId/:userId', verifyToken, deletePost)
router.put('/update-post/:postId/:userId',verifyToken, updatePost)

export default router