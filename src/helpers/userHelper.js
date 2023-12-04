
import userModel from '../models/user.js'



export const signupHelper = async (userData) =>{
   try{ 
    const {Fullname, Username, EmailOrMobile, Password} = userData
    const newUser = new userModel({
        Fullname,
        Username,
        EmailOrMobile,
        Password
    })
    const savedUser = await newUser.save()
    console.log('saved user are:',newUser);
    return savedUser;
}catch(error){
        console.log('error during signupHelper',error);
        throw error;
}
}

