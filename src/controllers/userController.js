import {
  getUserHelper,
  loginHelper,
  signupHelper,
  saveImgUrlHelper,
  getImgURL,
  saveProfilePic,
  followUserHelper,
  unFollowUserHelper,
  getFollowingtHelper,
  deletePostHelper,
  likePostHelper,
  commentPostHelper,
  getCommentListHelper,
  deleteFromCloudHelper,
  savePostHelper,
  fetchSavedPostHelper,
  fetchLikedHelper,
  blockUserHelper,
  fetchBlockedHelper,
  fetchNotificationHelper,
} from "../helpers/userHelper.js";
import jwt from "jsonwebtoken";
import { getIo, userSocket } from "../services/socketService.js";

//SIGNUP
export const signup = async (req, res) => {
  try {
    let newUser = req.body;

    let userData = await signupHelper(newUser);
    const payload = {
      userId: userData._id,
      userName: userData.Username,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: "100h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    let userData = req.body;
    let user = await loginHelper(userData);
    if (!user) {
      console.log("trouble logginIn");
    } else {
      const payload = {
        userId: user._id,
        userName: user.Username,
      };
      const token = jwt.sign(payload, process.env.SECRETKEY, {
        expiresIn: "100h",
      });

      res.status(200).json({ token });
    }
  } catch (error) {
    console.log("error during login controller : ", error);
  }
};

//GET USER FROM APP.JS
export const getUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    let { userData, userFollowData, userPost } = await getUserHelper(userId);
    if (userData) {
      res.status(200).json({ userData, userFollowData, userPost });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    console.log("error during getUser controller : ", error);
  }
};

// FOLLOW USER
export const followUser = async (req, res) => {
  try {
    const { userFollower, following } = req.body;
    const io = getIo();

    const { followerUser, savedNotification } = await followUserHelper(
      userFollower,
      following,
    );

    if (savedNotification) {
      const socketId = userSocket.get(following);

      if (socketId) {
        io.to(socketId).emit("notification:new", {
          type: "follow",
          from: userFollower,
        });
      }
    }
    res.status(200).json({ followerUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UNFOLLOW USER
export const unFollowUser = async (req, res) => {
  try {
    const { userFollower, following } = req.body;
    const unFollowData = await unFollowUserHelper(userFollower, following);

    if (!unFollowData) {
      console.log("somethings wrong in unfollowUser");
    } else {
      res.status(200).json({ unFollowData });
    }
  } catch (error) {
    console.log("error during unFollowUser :", error);
  }
};

// GET FOLLOWING USER DATA
export const getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followingData = await getFollowingtHelper(userId);
    if (followingData) {
      res.status(200).json({ followingData });
    } else {
      return [];
    }
  } catch (error) {
    console.log("error during getFollowing:", error);
  }
};

//-------------- POST / IMAGE CONTROLLER ---------------

// Save IMAGE URL
export const imgUrl = async (req, res) => {
  try {
    const { imgUrl, userId } = req.body;
    let savedImgUrl = await saveImgUrlHelper(imgUrl, userId);
    res.status(200).json({ savedImgUrl });
  } catch (error) {
    console.log("error during imgUrl controller: ", error);
  }
};

//GET IMAGE URL
export const getImgUrl = async (req, res) => {
  try {
    const imgURL = await getImgURL();
    res.json(imgURL);
  } catch (error) {
    console.log("error during getImgUrl :", error);
  }
};

// SAVE PROFILE IMAGE
export const profileImgUrl = async (req, res) => {
  try {
    const { ProfilePic, userId } = req.body;
    const ProfilePicData = await saveProfilePic(ProfilePic, userId);
    res.status(200).json({ ProfilePicData });
  } catch (error) {
    console.log("error during profileImgUrl :", error);
    res.status(500).send(error);
  }
};

// DELETE POST FROM DB & FROM CLOUD CONTROLLER
export const deletePost = async (req, res) => {
  try {
    const { publicId, postImg } = req.body;
    const deletedPost = await deletePostHelper(publicId, postImg);
    if (deletedPost.deletedCount === 0) {
      res
        .status(404)
        .json({ success: false, message: "Post not found or not deleted." });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("error during deletPost: ", error);
  }
};

// DELTE PROFILE PIC ONY FROM CLOUD
export const deleteFromCloudController = async (req, res) => {
  try {
    const { publicId } = req.body;
    const deletedFromCloud = await deleteFromCloudHelper(publicId);
    if (!deletedFromCloud) {
      return res
        .status(400)
        .json({ message: "Failed to delete from the cloud" });
    }
    res.status(201).json({ message: "Comment posted", deletedFromCloud });
  } catch (error) {
    console.log("error during deleteFromCloudController: ", error);
  }
};

//QUESTIONABLE
// GET USER BASED ON USER NAME
export const getUserNameController = async (req, res) => {
  try {
  } catch (error) {
    console.log("error during getUserNameController", error);
  }
};

// LIKE POST
export const likePostController = async (req, res) => {
  try {
    const { loggedUserId, postId, likeState } = req.body;
    const io = getIo();
    const { liked, notification, receiver } = await likePostHelper(
      loggedUserId,
      postId,
      likeState,
    );

    if (notification) {
      const socketId = userSocket.get(receiver);
      console.log("socket is here like: ", socketId);

      if (socketId) {
        io.to(socketId).emit("notification:new", {
          type: "like",
          from: loggedUserId,
        });
      }
    }

    res.status(200).json({
      success: true,
      liked,
    });
  } catch (error) {
    console.log("error during likePostController :", error);
  }
};

// GET COMMENT LIST
export const getCommentList = async (req, res) => {
  try {
    const { postId, pageNum } = req.query;
    //  console.log("pageeeeCunt :", pageNum);

    const commentList = await getCommentListHelper(postId, pageNum);
    if (!commentList) {
      return res.status(404).json({ message: "No comments found" });
    }
    // console.log(commentList);
    // console.log("somehow :", commentList);

    res.status(200).json({ commentList });
  } catch (error) {
    console.log("error during getCommentList: ", error);
  }
};

// POST COMMENT CONTROLLER
export const commentPostController = async (req, res) => {
  try {
    const { comment, commentId } = req.body;
    const postCommented = await commentPostHelper(comment, commentId);
    if (!postCommented) {
      return res.status(400).json({ message: "Failed to post comment" });
    }
    res.status(201).json({ message: "Comment posted", comment: postCommented });
  } catch (error) {
    console.log("error during commentPostController: ", error);
  }
};
// SAVE POST
export const savePost = async (req, res) => {
  try {
    const { loggedUserId, postId } = req.body;
    const postSaved = await savePostHelper(loggedUserId, postId);

    if (postSaved) {
      res.status(200).json({
        success: true,
        saved: true,
      });
    } else {
      res.status(200).json({
        success: true,
        saved: false,
      });
    }
  } catch (error) {
    console.log("error during savePost: ", error);
  }
};

// FETCH SAVED POST
export const fetchSavedPostController = async (req, res) => {
  try {
    const { loggedUserId } = req.body;
    const savedPosts = await fetchSavedPostHelper(loggedUserId);

    return res.status(200).json({ savedPosts });
  } catch (error) {
    console.log("error during fetchSavedPostController: ", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching saved posts" });
  }
};

// FETCH LIKED POST
export const fetchLikedController = async (req, res) => {
  try {
    const { loggedUserId } = req.body;
    const fetchedLikedPost = await fetchLikedHelper(loggedUserId);
    return res.status(200).json({ fetchedLikedPost });
  } catch (error) {
    console.log("error during fetchLikedPost: ", error);
  }
};

// BLOCK A USER
export const blockUserController = async (req, res) => {
  try {
    const { loggedUserId, postUserId } = req.body;
    const blockedUser = await blockUserHelper(loggedUserId, postUserId);
    if (blockedUser) {
      res.status(200).json({
        success: true,
        blocked: true,
      });
    } else {
      res.status(200).json({
        success: true,
        blocked: false,
      });
    }
  } catch (error) {
    console.log("error during blockUserController: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// FETCH BLOCKED LIST
export const fetchBlockedUserController = async (req, res) => {
  try {
    const { loggedUserId } = req.body;
    const blockedList = await fetchBlockedHelper(loggedUserId);
    return res.status(200).json({ blockedList });
  } catch (error) {
    console.log("error during fetchBlockedUserController: ", error);
  }
};

// FETCH NOTIFICATION DATA
export const fetchNotificationController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notificationData = await fetchNotificationHelper(userId);
    return res.status(200).json({ notificationData });
  } catch (error) {
    console.log("error during fetchNotificationController: ", error);
  }
};
