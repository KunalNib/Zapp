import express from "express";
import { login,logout, register ,reVerify,verify,forgotPassword, verifyOtp, changePassword, getAllUsers,getUserById} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middlewares/isAuthenticated.js";

const router=express.Router();

router.post("/register",register);
router.post("/verify",verify);
router.post("/reverify",reVerify);
router.post("/login",login);
router.post("/logout",isAuthenticated,logout);
router.post("/forgot-password",forgotPassword);
router.post("/verify-otp/:email",verifyOtp);
router.post("/change-password/:email",changePassword);
router.get('/all-user',isAuthenticated,isAdmin,getAllUsers);
router.get('/get-user/:userId',isAuthenticated,getUserById);

export default router;