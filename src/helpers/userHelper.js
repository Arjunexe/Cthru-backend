import userModel from "../models/user.js";
import postModel from "../models/postModel.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Follow from "../models/followModel.js";

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
      console.log("the passowrd is here :",user.Password);
      
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
export const getUserHelper = async (userId) => {
  try {
    let userData = await userModel.findOne({ _id: userId },{Password:0});
    if (!userData) {
      console.log("user data doesn't exist");
      return false;
    }
    return userData;
  } catch (error) {
    console.log("error during getUserHelper :", error);
  }
};  
 
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


//GET IMAGE URL not based on id
export const getImgURL = async () => {
  try {
    const post = await postModel.find().populate("userId", "Username ProfilePic").sort({ createdAt: -1 });
    return post;
  } catch (error) {
    console.log("error during getImgURL");
  }
};

// AI




// SAVING PROFILE PIC UPDATING USING findByIdAndUpdate
export const saveProfilePic = async (ProfilePic, userId) => {
  try{
    const user = await userModel.findById(userId)  
    if(user){
      const updateUserProfile = await userModel.findByIdAndUpdate(userId,{ProfilePic},{new: true})
      // user.ProfilePic = ProfilePic
      // const savedProfilePic = await user.save()
      return updateUserProfile;
    } else {
      console.log("user doesn't exist");
      return false;
    }
  } catch (error){
    console.log("error during saveProfilePic :", error);
    
  }
}

// SAVE FOLLOWER AND FOLLOWING 
export const followUserHelper = async (userFollower, following) => {
  try {
    console.log("its in here buddy :", userFollower);
    const followerUser = await Follow.findOneAndUpdate({userId : userFollower}, { $addToSet: { following: following } },{ new: true, upsert: true })


    console.log("there is a userFollower :", followerUser);
    if(!followerUser){
      console.log("somethings wrong");
    } else {
      const followingUser = await Follow.findOneAndUpdate({userId: following}, { $addToSet: { followers: userFollower }}, {new: true, upsert: true})
      console.log("there is a followingUser :", followingUser);

    }

  } catch (error) {
      console.log("error during followuserHelper :", error);
      
  }
}