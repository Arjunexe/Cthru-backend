import userModel from "../models/user.js";
import postModel from "../models/postModel.js";
import bcrypt from "bcrypt";
// import User from "../models/user.js";
import Follow from "../models/followModel.js";
import cloudinaryConfig from "../services/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

//SIGNUP HELPER
export const signupHelper = async (userData) => {
  try {
    const { Fullname, Username, EmailOrMobile, Password } = userData;
    const newUser = new userModel({
      Fullname,
      Username,
      EmailOrMobile,
      Password,
    });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.log("error during signupHelper", error);
    throw error;
  }
};

//LOGIN HELPER
export const loginHelper = async (userData) => {
  try {
    let { emailOrmobile, password } = userData;
    let userIn;
    let user = await userModel.findOne({
      EmailOrMobile: emailOrmobile,
    });
    if (!user) {
      console.log("user doesn't exist");
      return false;
    } else {
      console.log("the passowrd is here :", user.Password);

      userIn = await bcrypt.compare(password, user.Password);
    }
    if (!userIn) {
      console.log("credentials don't match");
      return false;
    } else {
      console.log("user exist");
      return user;
    }
  } catch (error) {
    console.log("error during loginHelper:", error);
  }
};

//getUser
export const getUserHelper = async (userInfo) => {
  try {
    let userId = userInfo;

    if (userInfo && userInfo.length <= 10) {
      console.log("its username", userInfo);

      let userFullId = await userModel.findOne(
        { Username: userInfo },
        { _id: 1 }
      );
      console.log("userFullId here: ", userFullId);
      if (!userFullId) {
        console.log("user dataaa doesn't exist");
        return false;
      }
      userId = userFullId._id.toString();
      console.log("JUST id is here: ", userFullId);
    }

    let userData = await userModel.findOne({ _id: userId }, { Password: 0, like: 0, saved: 0, blocked: 0});
    let userFollowData = await Follow.findOne({ userId: userId });
    let userPost = await postModel.find({ userId }).exec();

    return { userData, userFollowData, userPost };
  } catch (error) {
    console.log("error during getUserHelper :", error);
  }
};

// FOLLOW USER
export const followUserHelper = async (userFollower, following) => {
  try {
    const followerUser = await Follow.findOneAndUpdate(
      { userId: userFollower },
      { $addToSet: { following: following } },
      { new: true, upsert: true }
    );
    // console.log("its in here dudee :", followerUser);
    if (!followerUser) {
      console.log("somethings wrong");
    } else {
      const followingUser = await Follow.findOneAndUpdate(
        { userId: following },
        { $addToSet: { followers: userFollower } },
        { new: true, upsert: true }
      );
      return followerUser;
    }
  } catch (error) {
    console.log("error during followuserHelper :", error);
  }
};

// UNFOLLOW USER
export const unFollowUserHelper = async (userFollower, following) => {
  try {
    const unFolloUser = await Follow.findOneAndUpdate(
      { userId: userFollower },
      { $pull: { following: following } },
      { new: true }
    );
    // console.log("its hereree :", unFolloUser);

    if (!unFolloUser) {
      console.log("somethings wrong");
    } else {
      const unFollowed = await Follow.findOneAndUpdate(
        { userId: following },
        { $pull: { followers: userFollower } }
      );
    }
    return unFolloUser;
  } catch (error) {
    console.log("error during unFollowUserHelper :", error);
  }
};

// GET FOLLOWING USER DATA
export const getFollowingtHelper = async (userId) => {
  try {
    const followingData = await Follow.findOne(
      { userId: userId },
      { _id: 0, followers: 0, userId: 0 }
    );

    if (!followingData) {
      return false;
    }
    if (!followingData.following) {
      return false;
    } else {
      const followingUserData = followingData.following;

      const followingUser = await userModel.find(
        { _id: { $in: followingUserData } },
        { Username: 1, ProfilePic: 1, _id: 0 }
      );
      return followingUser;
    }
  } catch (error) {
    console.log("error during getFollowingHelper:", error);
  }
};

//-------------------- POST / IMAGE HELPER ---------------------

//SAVE IMAGE URL
export const saveImgUrlHelper = async (imgUrl, userId) => {
  try {
    const newImage = new postModel({
      postImage: imgUrl,
      userId: userId,
    });

    const savedImg = await newImage.save();
    return savedImg;
  } catch (error) {
    console.log("error during saveImgUrlHelper :", error);
  }
};

//GET IMAGE URL NOT BASED ON _ID
export const getImgURL = async () => {
  try {
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    const post = await postModel
      .find()
      .populate("userId", "Username ProfilePic");
    // .sort({ createdAt: -1 });
    return shuffle(post);
  } catch (error) {
    console.log("error during getImgURL");
  }
};

// AI

// SAVING PROFILE PIC UPDATING USING findByIdAndUpdate
export const saveProfilePic = async (ProfilePic, userId) => {
  try {
    const user = await userModel.findById(userId);
    if (user) {
      const updateUserProfile = await userModel
        .findByIdAndUpdate(userId, { ProfilePic }, { new: true })
        .select("-blocked -saved -like");
      // user.ProfilePic = ProfilePic
      // const savedProfilePic = await user.save()
      console.log("updatedddddddddddddd: ", updateUserProfile);

      return updateUserProfile;
    } else {
      console.log("user doesn't exist");
      return false;
    }
  } catch (error) {
    console.log("error during saveProfilePic :", error);
  }
};

// DELETE POST FROM DB AND FROM CLOUD
export const deletePostHelper = async (publicId, postImg) => {
  try {
    const deleteFromCloud = await cloudinary.uploader.destroy(publicId);
    if (deleteFromCloud.result !== "ok") {
      console.log("Post from Cloud not deleted");
    }
    const deleteFromDb = await postModel.deleteOne({ postImage: postImg });
    console.log(deleteFromDb);

    return deleteFromDb;
  } catch (error) {
    console.log("error during deletePostHelper: ", error);
  }
};

// DELETE PROFILE PIC FROM ONLY CLOUD
export const deleteFromCloudHelper = async (publicId) => {
  try {
    const deleteFromCloud = await cloudinary.uploader.destroy(publicId);
    if (deleteFromCloud.result !== "ok") {
      console.log("Post from Cloud not deleted");
    } else {
      return true;
    }
  } catch (error) {
    console.log("error during deleteFromCloudHelper: ", error);
  }
};

// LIKE POST HELPER
export const likePostHelper = async (loggedUserId, postId, likeState) => {
  try {
    // UNLIKE A POST

    if (likeState) {
      const unLikePost = await postModel.updateOne(
        { _id: postId },
        { $pull: { like: loggedUserId } }
      );
      const unLikeUserSide = await userModel.updateOne(
        { _id: loggedUserId },
        { $pull: { like: postId } }
      );

      return false;
      // LIKE A POST
    } else {
      const likePost = await postModel.updateOne(
        { _id: postId },
        { $addToSet: { like: loggedUserId } }
      );

      const likeUserSide = await userModel.updateOne(
        { _id: loggedUserId },
        { $addToSet: { like: postId } }
      );

      return true;
    }
  } catch (error) {
    console.log("error during likePostHelper :", error);
  }
};

// GET COMMENT LIST HELPER
export const getCommentListHelper = async (postId, pageNum) => {
  try {
    const limit = 15;
    const skip = (pageNum - 1) * limit;

    const post = await postModel
      .findById(postId)
      .populate("comment.user", "Username ProfilePic");
    if (!post) {
      return false;
    }

    return post.comment.slice(skip, skip + limit);
  } catch (error) {
    console.log("error during getCommentHelper: ", error);
    throw error;
  }
};

// POST COMMENT HELPER
export const commentPostHelper = async (comment, commentId) => {
  try {
    const { postId, loggedUserId } = commentId;

    const commentPosted = await postModel.updateOne(
      { _id: postId },
      {
        $push: {
          comment: { user: loggedUserId, text: comment, createdAt: new Date() },
        },
      }
    );
    // return commentPosted.modifiedCount > 0; || doubt ||
    return commentPosted;
  } catch (error) {
    console.log("error during commentPostHelper: ", error);
    throw error;
  }
};

// SAVE POST
export const savePostHelper = async (loggedUserId, postId) => {
  try {
    const alreadySaved = await userModel.findOne({
      _id: loggedUserId,
      saved: postId,
    });

    if (alreadySaved) {
      // Post is already saved -- Unsave
      const postUnsavedUser = await postModel.updateOne(
        { _id: postId },
        { $pull: { saved: loggedUserId } }
      );

      const userSavedPost = await userModel.updateOne(
        { _id: loggedUserId },
        { $pull: { saved: postId } }
      );
      return false;
    } else {
      // Post is not saved -- Save
      const postSavedUser = await postModel.updateOne(
        { _id: postId },
        {
          $addToSet: { saved: loggedUserId },
        }
      );
      const userSavedPost = await userModel.updateOne(
        { _id: loggedUserId },
        { $addToSet: { saved: postId } }
      );
      return true;
    }
  } catch (error) {
    console.log("error during savePostHelper: ", error);
    throw error;
  }
};

// FETCH SAVED POST
export const fetchSavedPostHelper = async (loggedUserId) => {
  try {
    // const savedPost = await userModel.find({ _id: loggedUserId });
    const savedPost = await postModel.find({ saved: loggedUserId });
    return savedPost;
  } catch (error) {
    console.log("error during fetchSavedPostHelper: ", error);
  }
};

// FETCH LIKED POST
export const fetchLikedHelper = async (loggedUserId) => {
  try {
    const likedPost = await postModel.find({ like: loggedUserId });
    return likedPost;
  } catch (error) {
    console.log("error during fetchLikeHelper: ", error);
    throw error;
  }
};

// BLOCK A USER
export const blockUserHelper = async (loggedUserId, postUserId) => {
  try {
    const alreadyBlocked = await userModel.findOne({
      _id: loggedUserId,
      blocked: postUserId,
    });
    if (alreadyBlocked) {
      // Unblock the user
      const userUnblocked = await userModel.updateOne(
        { _id: loggedUserId },
        { $pull: { blocked: postUserId } }
      );
      return false;
    } else {
      // Block the user
      const blockedUser = await userModel.updateOne(
        { _id: loggedUserId },
        { $addToSet: { blocked: postUserId } }
      );
      return true;
    }
  } catch (error) {
    console.log("error during blockUserHelper: ", error);
    throw error;
  }
};

// FETCH BLOCKED USERS
export const fetchBlockedHelper = async (loggedUserId) => {
  try {
    const blockedList = await userModel
      .findById(loggedUserId)
      .populate("blocked", "Username ProfilePic");

    return blockedList;
  } catch (error) {
    console.log("error during fetchBlockedHelper: ", error);
    throw error;
  }
};
