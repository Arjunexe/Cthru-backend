import { Router } from "express";
import {
  getUser,
  login,
  signup,
  imgUrl,
  getImgUrl,
  profileImgUrl,
  followUser,
  unFollowUser,
  getFollowing,
  getUserNameController,
  deletePost,
  likePostController,
  commentPostController,
  getCommentList,
  deleteFromCloudController,
  savePost,
  fetchSavedPostController,
  fetchLikedController,
  blockUserController,
  fetchBlockedUserController,
  fetchNotificationController,
  changeFlagController,
} from "../controllers/userController.js";
import { otpVerify, sendOtp } from "../controllers/otpController.js";

const router = Router();

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// GET USER USING ID FROM THE PARAMS
router.get("/getUser/:userId", getUser);

// UPLOAD POST IMAGE
router.post("/imgUrl", imgUrl);

// POST IMAGE RETRIEVAL
router.get("/getUrl", getImgUrl);

// FETCH IMAGES FOR HOME PAGE BASED OF THE FOLLOWING LIST
// router.get("/getHomePostData/:userId", getHomePostData);

// SAVE PROFILE PICTURE
router.post("/profileImgUrl", profileImgUrl);

// FOLLOW USER
router.post("/followUser", followUser);

// UNFOLOOW USER
router.post("/unFollowUser", unFollowUser);

// GET FOLLOWING USER DATA
router.get("/getFollowing/:userId", getFollowing);

// GET USER BASED ON USER NAME || qeustionable also was missing a slash
router.get("/getUserNameData/:urlUsername", getUserNameController);

// DELETING POST IMAGES FROM DB AND CLOUD
router.post("/deletePost", deletePost);

// DELETE PROFIE PIC ONLY FROM CLOUD
router.post("/deleteFromCloud", deleteFromCloudController);

// LIKE OR UNLIKE POST
router.post("/likePost", likePostController);

// GET COMMENT LIST
router.get("/getCommentList", getCommentList);

// POST A COMMENT
router.post("/commentPost", commentPostController);

// SAVE A POST
router.post("/savePost", savePost);

// FETCH SAVED POST
router.post("/fetchPost", fetchSavedPostController);

router.post("/fetchLikedPost", fetchLikedController);

// BLOCK A USER
router.post("/blockUser", blockUserController);

// FETCH BLOCKED LIST
router.post("/fetchBlockedUsers", fetchBlockedUserController);

// FETCH NOTIFICATION DATA
router.get("/getNotificationData/:userId", fetchNotificationController);

// CHANGE NOTIFICATION FLAG
router.patch("/changeFlag", changeFlagController);

// RECEIVE EMAIL AND SEND OTP
router.post("/otpEmail", sendOtp);

// VERIFY OTP
router.post("/otpVerify", otpVerify);

export default router;
