import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"


export const verifyToken = async (req, res, next)=>{
    //getting the token
    const token = req.cookies.access_token
    //verify the token
    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'the user is not authorized'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
                    return res
                        .status(StatusCodes.UNAUTHORIZED)
                        .json({ message: "the user is not authorized" });

        }

        //send the user data if the token is verified 
        req.user= user
        next() //update user function
    })
}