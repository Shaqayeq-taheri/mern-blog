import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { userName, familyName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        userName,
        familyName,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        return res
            .status(StatusCodes.CREATED)
            .json({ success: true, message: "User created successfully" });
    } catch (error) {
        if (error.code === 11000) {
            // MongoDB duplicate key error
            return res
                .status(StatusCodes.CONFLICT) // HTTP 409: Conflict
                .json({ success: false, message: "Email already exists" });
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: "An unexpected error occurred" });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Email or password does not match" });
        }
        const validPassword = bcryptjs.compareSync(password, user.password); //user.password is hashed, but password is coming from req.body, so bcrypt make it as a hashed password and then compare them
        if (!validPassword) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Email or password does not match " });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        /* for avoiding to return back the password */
        const { password: pass, ...rest } = user._doc;
        /*with this code a cookie is created with the name access_token which is a encrypted value id pf the user  */
        res.status(StatusCodes.OK)
            .cookie("access_token", token, { httpOnly: true })
            .json({ message: "sign in successfull", rest });
    } catch (error) {
        console.error("Error during signin occurred:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "An error occured in the server " });
    }
};

export const googleAuth = async (req, res) => {
    /* the three info that coming from frontend OAth */
    const { name, email, googlePhotoUrl } = req.body;
    /* check if the user exists */
    try {
        const user = await User.findOne({ email });
        if (user) {
            /* if the user exists make a token */
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(StatusCodes.OK)
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .json(rest);
        } /* if the user is not exist, we should create the user with a random password,because since the name and email coming from google, we need a password */ else {
            /* base-36 numeral system: Converts the random decimal number into a base-36 string: 0.123456789 */
            const [userName, ...restFamilyName] = name.toLowerCase().split(" ");
            const familyName = restFamilyName.join(" ");
            console.log(userName, familyName);
            const generatedRandomPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(
                generatedRandomPassword,
                10
            );
            const newUser = new User({
                userName,
                familyName,
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save()
            const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET)
            const { password, ...rest }= newUser._doc
            res.status(StatusCodes.OK).cookie('access_token',token, {httpOnly: true} ).json(rest)
        }
    } catch (error) {
             console.error("Error during signin occurred:", error);
              return res
                  .status(StatusCodes.INTERNAL_SERVER_ERROR)
                  .json({ message: "An error occured in the server " });
    }
};
