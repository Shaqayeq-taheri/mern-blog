import { StatusCodes } from "http-status-codes";
import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js";



export const getAllUsers = async (req, res) => {
    res.json({message:'the user api is working'})
};

export const updateUser= async (req, res)=>{

    //check the cookie of the browser if the user is authenticated or not
    

  /*   req.user.id comes from the decoded token, which represents the authenticated user's ID.
req.params.userId comes from the route parameter in the URL, such as /users/:userId */


if(req.user.id !== req.params.userId){
return res.status(StatusCodes.BAD_REQUEST).json({message: 'You are not allowed to update the user Profile'})
}
if(req.body.password){
    if(req.body.password.length < 6){
        return res.status(StatusCodes.BAD_REQUEST).json({message:'password must be at least 6 characters'})
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
}

try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
        $set:{
            userName : req.body.userName,
            familyName: req.body.familyName,
            email:req.body.email,
            password:req.body.password,
            profilePicture: req.body.profilePicture

        }

    }, {new:true})
    const {password, ...rest}= updatedUser._doc
    res.status(StatusCodes.OK).json(rest)
} catch (error) {
    
}

}