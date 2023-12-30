import { loginHelper, signupHelper } from "../helpers/userHelper.js";
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
    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });
    // console.log("token is:", token);
    res.status(200).json({token});
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

  } catch (error) {
    console.log("error during login controller : ", error);
  }
};
