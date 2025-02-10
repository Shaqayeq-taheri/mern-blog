import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "only admin can access to the list of users",
            });
        }
        const startIndex = parseInt(req.query.startIndex) || 0; //if there is no startindex, set it to 0
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === "asc" ? 1 : -1;

        const allUsers = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex) //skip beginning up to the startindex
            .limit(limit);

        const totalUsers = await User.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDay()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(StatusCodes.OK).json({allUsers,totalUsers,lastMonthUsers});


    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.toString() });
    }
};

export const updateUser = async (req, res) => {
    //check the cookie of the browser if the user is authenticated or not

    /*   req.user.id comes from the decoded token, which represents the authenticated user's ID.
req.params.userId comes from the route parameter in the URL, such as /users/:userId */

    if (req.user.id !== req.params.userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "You are not allowed to update the user Profile",
        });
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "password must be at least 6 characters" });
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    userName: req.body.userName,
                    familyName: req.body.familyName,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(StatusCodes.OK).json(rest);
    } catch (error) {}
};

export const deleteUser = async (req, res) => {
    try {
        if (req.user.id !== req.params.userId) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ message: "you are not allowed to delete the user" });
        }

        //check if the user exists
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                status: "error",
                message: "the user not found",
            });
        }

        //delete the user
        await User.findByIdAndDelete(req.params.userId);
        res.status(StatusCodes.OK).json({
            message: "the user is deleted successfully",
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "there is an error during deleting the user",
            error,
        });
    }
};

export const signout = (req, res) => {
    try {
        res.clearCookie("access_token")
            .status(StatusCodes.OK)
            .json({ message: "user signed out successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occured during siging out the user",
            error,
        });
    }
};
