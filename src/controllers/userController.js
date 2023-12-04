import { signupHelper } from "../helpers/userHelper.js";
import jwt from 'jsonwebtoken'


  
  export const signup = async (req,res) => {
    try{
    let newUser = req.body;
    let userData = await signupHelper(newUser)
      const payload = {
        userId : userData._id,
        userName:userData.Username
      }
      const token = jwt.sign(payload,process.env.SECRETKEY, {expiresIn:'1h'})
      console.log('token is:',token);

    res.status(200).json(userData)
  }catch(error){
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' })
     }
   }
  
//hi

