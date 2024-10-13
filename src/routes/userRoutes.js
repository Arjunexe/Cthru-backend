import { Router } from "express";
import { getUser, login, signup, imgUrl, getImgUrl } from "../controllers/userController.js";

const router = Router();

// Login and Signup
router.post("/signup", signup);
router.post("/login", login);

// Get User, Sending the userId from frontend throught params
router.get("/getUser/:userId", getUser)

// Image Upload and Retrieval
router.post("/imgUrl", imgUrl)
router.get("/getUrl", getImgUrl)


export default router;
