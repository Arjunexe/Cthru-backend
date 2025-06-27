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
} from "../helpers/userHelper.js";
import jwt from "jsonwebtoken";

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

    const followData = await followUserHelper(userFollower, following);
    // console.log("its in here buddy :", followData);
    // console.log("its in here buddy :", followData);
    res.status(200).json({ followData });
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
    console.log("hopefully it the details :", followingData);
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
    const postLiked = await likePostHelper(loggedUserId, postId, likeState);

    if (postLiked) {
      res.status(200).json({
        success: true,
        liked: true,
      });
    } else {
      res.status(200).json({
        success: true,
        liked: false,
      });
    }
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

// export const commentPostController = async (req, res) => {
//   try {
//     const { comment, commentId } = req.body;
//     const postCommented = await commentPostHelper(comment, commentId);

//     if (!postCommented) {
//       return res.status(400).json({ message: "Failed to post comment" });
//     }

//     res.status(201).json({ message: "Comment posted", comment: postCommented });
//   } catch (error) {
//     console.error("error during commentPostController:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
