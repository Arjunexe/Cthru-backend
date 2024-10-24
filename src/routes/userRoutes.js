import { Router } from "express";
import { getUser, login, signup, imgUrl, getImgUrl, profileImgUrl, followUser } from "../controllers/userController.js";

const router = Router();

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// GET USER USING ID FROM THE PARAMS
router.get("/getUser/:userId", getUser)

// UPLOAD POST IMAGE
router.post("/imgUrl", imgUrl)

// POST IMAGE RETRIEVAL
router.get("/getUrl", getImgUrl)

// SAVE PROFILE PICTURE 
router.post("/profileImgUrl",profileImgUrl)

// FOLLOW USER
router.post("/followUser", followUser)


export default router;
