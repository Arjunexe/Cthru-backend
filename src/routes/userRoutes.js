import { Router } from "express";
import { getUser, login, signup, imgUrl, getImgUrl, profileImgUrl, followUser, unFollowUser, getFollowing, getUserNameController, deletePost, likePostController, commentPostController } from "../controllers/userController.js";

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

// UNFOLOOW USER
router.post("/unFollowUser", unFollowUser)

// GET FOLLOWING USER DATA
router.get("/getFollowing/:userId", getFollowing)

// GET USER BASED ON USER NAME
router.get("getUserNameData/:urlUsername", getUserNameController)

// DELETING POST IMAGES FROM DB AND CLOUD
router.post("/deletePost", deletePost)

// LIKE POST
router.post("/likePost", likePostController)

// COMMENT POST
router.post("/commentPost", commentPostController)


export default router;
