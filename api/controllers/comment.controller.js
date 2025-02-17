import { StatusCodes } from "http-status-codes"
import Comment from "../models/comment.model.js"



export const createComment = async (req, res)=>{

    try {
        const{ content, postId, userId}= req.body
        if(userId !== req.user.id){
            return res.status(StatusCodes.UNAUTHORIZED).json({message:'you are not allowed to write a comment'})
        }
        const newComment = new Comment({
            content,
            userId,
            postId

        })
        await newComment.save()
        res.status(StatusCodes.OK).json(newComment)
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:
                "An error occurred while creating the comment. Please try again later.",
        });
        
    }

}