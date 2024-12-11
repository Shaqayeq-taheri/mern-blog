import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import{StatusCodes} from "http-status-codes"



export const signup= async(req,res)=>{
   const {userName,familyName, email, password} = req.body
   const hashedPassword = bcryptjs.hashSync(password,10)


   const newUser = new User({
     userName,
     familyName,
     email,
     password:hashedPassword
   })
   try {
    await newUser.save()
    return res.status(StatusCodes.CREATED).json({message:"the user created successfully"})
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR) 
      .json({ message: error.toString() });
  }
}
