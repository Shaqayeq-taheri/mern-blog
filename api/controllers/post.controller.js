import { StatusCodes } from "http-status-codes";
import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  if (!req.user.isAdmin) {
      return res.status(StatusCodes.FORBIDDEN).json({

          message: "Access denied. Only admins can create posts."
      });
  }
  if (!req.body.title || !req.body.content) {
      return res.status(StatusCodes.BAD_REQUEST).json({
      
          message:
              "Please provide all required fields (userId, content, title, slug)."
      });
  }
  const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
  });
  try {
      const savedPost = await newPost.save();
      res.status(StatusCodes.OK).json(savedPost);
  } catch (error) {
       console.error("Error creating post:", error);
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

           message:
               "An error occurred while creating the post. Please try again later."
       })
  }
};
