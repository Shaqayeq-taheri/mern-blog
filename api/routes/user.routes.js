import express from "express";
import {
    getAllUsers,
    updateUser,
    deleteUser,
    signout,
    getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/getUsers", verifyToken, getAllUsers);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/deleteUser/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getUser/:userId", getUser); //fetching user for comment section

export default router;
