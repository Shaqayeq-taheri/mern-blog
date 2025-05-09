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


export const getAllPosts = async (req, res)=>{
    try {


        /* stting up pagination */
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit)|| 3
       
        const sortDirection = req.query.order === 'asc' ? 1 : -1 //1 ascending , -1 descending
        
        /* query filters(based on userId, category and...) */
        const posts = await Post.find({
            ...(req.query.userId && {userId: req.query.userId}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id: req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title: {$regex: req.query.searchTerm, $options: 'i'}},
                    {content: {$regex: req.query.searchTerm, $options: 'i'}}
                ],
            })
    }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit)

    const totalPosts = await Post.countDocuments()
    const now = new Date()
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth()- 1,
        now.getDate()
    )
        

    const lastMonthsPosts = await Post.countDocuments({
        createdAt:{$gte:oneMonthAgo}
    })


    res.status(StatusCodes.OK).json({posts, totalPosts, lastMonthsPosts})
    } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
    });    }
}




export const deletePost = async(req, res)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:'You are not allowed to delete this post'})
    }
    try {
        await Post.findByIdAndDelete(req.params.postId)
        res.status(StatusCodes.OK).json({message:'The post has been deleted successfully'})
        
    } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
             error: "Internal Server Error",
         });
    }
}


export const updatePost= async(req,res)=>{


    //if the user is not admin or is not the owner of the post
 if (!req.user.isAdmin || req.user.id !== req.params.userId) {
     return res
         .status(StatusCodes.UNAUTHORIZED)
         .json({ message: "You are not allowed to delete this post" });
 }
 try {
    
     const updatedPost = await Post.findByIdAndUpdate(
         req.params.postId,
         { $set: req.body },
         { new: true }
     );

 res.status(200).json({ message: "Post updated", slug: updatedPost.slug });
 } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
    });
    
 }
}


export const getSearchedPosts = async(req,res)=>{
    const {searchTerm} = req.query

    try {
        const posts = Post.find({
            //MongoDB query operator, search either title or content
            $or: [
                { title: { $regex: searchTerm, $options: "i" } }, //$options: 'i'means: case insensitiv
                { content: { $regex: searchTerm, $options: "i" } },
            ],
        }).sort({ createdAt: -1 }); // Newest first

        res.status(StatusCodes.OK).json(posts)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
        });
    }
}