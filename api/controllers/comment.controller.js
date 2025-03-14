import { StatusCodes } from "http-status-codes";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
    try {
        const { content, postId, userId } = req.body;
        if (userId !== req.user.id) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "you are not allowed to write a comment" });
        }
        const newComment = new Comment({
            content,
            userId,
            postId,
        });
        await newComment.save();
        res.status(StatusCodes.OK).json(newComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:
                "An error occurred while creating the comment. Please try again later.",
        });
    }
};

export const getPostComments = async (req, res) => {
    try {
        const comment = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,
        }); //sort based on the newest one
        res.status(StatusCodes.OK).json(comment);
    } catch (error) {
        console.error("Error getting the comments:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:
                "An error occurred while getting the comments. Please try again later.",
        });
    }
};

export const likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "the comment not found" });
        }
        //if the comment exists
        const userIndex = comment.likes.indexOf(req.user.id); //comming from verify token
        //we want to check if the id of the person is in the array -1 means the user is not array
        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id); // add the user inside the likes array
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1); //remove the index(user)
        }
        await comment.save();
        return res.status(StatusCodes.OK).json(comment);
    } catch (error) {
        console.error("an error occured while liking the comment:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:
                "An error occurred while liking the comment. Please try again later.",
        });
    }
};

export const editComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "the comment not found" });
        }

        //check if the owner of the comment is or the admin
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ message: "you are not allowed to edit the comment" });
        }

        const editedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                content: req.body.content,
            },
            { new: true }
        );

        res.status(StatusCodes.OK).json(editedComment)
    } catch (error) {
        console.error("an error occured while editing the comment:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:
                "An error occurred while editing the comment. Please try again later.",
        });
    }
};


export const deleteComment = async(req,res)=>{
    try {

        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            return res.status(StatusCodes.NOT_FOUND).json({message:'the comment not found'})
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
             return res
                 .status(StatusCodes.FORBIDDEN)
                 .json({ message: "you are not allowed to delete the comment" });

        }

        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(StatusCodes.OK).json({message:"the comment deleted successfully"})


        
    } catch (error) {
         console.error("an error occured while deleting the comment:", error);
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             message:
                 "An error occurred while deleting the comment. Please try again later.",
         });
    }
}




export const getAllComments = async (req, res)=>{
    if(!req.user.isAdmin) return res.status(StatusCodes.FORBIDDEN).json({message:"only admin can get all the comments"})
    try {
const startIndex = parseInt(req.query.startIndex) || 0 //start from zero by default

const limit = parseInt(req.query.limit) || 9
const sortDirection= req.query.sort ==='desc'? -1 :1

const comments = await Comment.find().sort({createdAt:sortDirection}).skip(startIndex).limit(limit)
const totalComments = await Comment.countDocuments()
const now = new Date()
const oneMonthAgo = new Date(now.getFullYear(), now.getMonth()-1, now.getDate())
const lastMonthsComments = await Comment.countDocuments({createdAt:{$gte:oneMonthAgo}}) //the comments that are greater than oneMonthAgo
res.status(StatusCodes.OK).json({comments,totalComments,lastMonthsComments})


} catch (error) {
         console.error("an error occured while getting the comments:", error);
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             message:
                 "An error occurred while getting the comments. Please try again later.",
         });
    }
}