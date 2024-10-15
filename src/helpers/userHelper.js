import userModel from "../models/user.js";
import postModel from "../models/postModel.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";

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
    console.log("saved user are:", newUser);
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
    // console.log("this is the user data : ", userData);
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
    console.log("behind :", imgUrl);
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
    const post = await postModel.find().populate("userId", "Username ProfilePic");
    console.log("found the post :",post);
    return post;
  } catch (error) {
    console.log("error during getImgURL");
  }
};

// Save Profile Pic
export const saveProfilePic = async (ProfilePic, userId) => {
  try{
    const user = await userModel.findById(userId)  
    if(user){
      user.ProfilePic = ProfilePic
      const savedProfilePic = await user.save()
      return savedProfilePic;
    } else {
      console.log("user doesn't exist");
      return false;
    }
  } catch (error){
    console.log("error during saveProfilePic :", error);
    
  }
}