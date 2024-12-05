import {
  getUserHelper,
  loginHelper,
  signupHelper,
  saveImgUrlHelper,
  getImgURL,
  saveProfilePic,
  followUserHelper,
  unFollowUserHelper,
  getFollowingtHelper
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
    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "100h" });
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
    let {userData, userFollowData} = await getUserHelper(userId);
    
    res.status(200).json({ userData, userFollowData });
  } catch (error) {
    console.log("error during getUser controller : ", error);
  }
};

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
  try{
    const {ProfilePic, userId} = req.body
    const ProfilePicData = await saveProfilePic(ProfilePic, userId)
    res.status(200).json({ProfilePicData})
    
  } catch (error) {
    console.log("error during profileImgUrl :",error);
    res.status(500).send(error);
    
  }
}

// FOLLOW USER
export const followUser = async (req, res) => {
  try {
    const { userFollower, following } = req.body
    
    const followData = await followUserHelper (userFollower, following)
    // console.log("its in here buddy :", followData);
    // console.log("its in here buddy :", followData);
    res.status(200).json({followData});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// UNFOLLOW USER
export const unFollowUser = async (req, res) => {
  try {
    const { userFollower, following } = req.body
    const unFollowData = await unFollowUserHelper( userFollower, following )
    
    if(!unFollowData){
      console.log("somethings wrong in unfollowUser");
    } else {
      res.status(200).json({unFollowData})
    }
    
  } catch (error) {
    console.log("error during unFollowUser :", error);
    
  }
}

// GET FOLLOWING USER DATA
export const getFollowing = async (req, res) => {
  try {

      const userId = req.params.userId
      console.log("here is the dataaaa:", userId);
      const followingData = await getFollowingtHelper(userId)
      
  } catch (error) {
      console.log("error during getFollowing:", error);
      
  }
}

