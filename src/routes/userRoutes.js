import { Router } from "express";
import { getUser, login, signup, imgUrl, getImgUrl } from "../controllers/userController.js";

const router = Router();

// Login and Signup
router.post("/signup", signup);
router.post("/login", login);

// Get User, Sending the userId from frontend throught params
router.get("/getUser/:userId", getUser)

// Image Upload 
router.post("/imgUrl", imgUrl)
// Image retrieval
router.get("/getUrl", getImgUrl)


export default router;
