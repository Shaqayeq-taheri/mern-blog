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
        await comment.save()
        return res.status(StatusCodes.OK).json(comment)
    } catch (error) {
         console.error("an error occured while liking the comment:", error);
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             message:
                 "An error occurred while liking the comment. Please try again later.",
         });
    }
};
