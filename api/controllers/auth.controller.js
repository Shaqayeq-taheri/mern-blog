import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import{StatusCodes} from "http-status-codes"



export const signup= async(req,res)=>{
   const {userName, email, password} = req.body
   const hashedPassword = bcryptjs.hashSync(password,10)


   try {
    const user = await User.create({
    
     userName,
     familyName,
      email,
      password: hashedPassword,
   
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "user created successfully", user });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR) 
      .json({ message: error.toString() });
  }
}
