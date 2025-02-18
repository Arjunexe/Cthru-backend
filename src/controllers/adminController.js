import { getAllUserHelper } from "../helpers/adminHelper.js";

export async function getAllUsers(req, res) {
  try {
    const allUser = await getAllUserHelper();
    console.log("all Users are: ", allUser);
    if (allUser) {
      res.status(200).json({ allUser });
    } else {
      return res.status(400).json({success:false, message:"getAllUserController failed"})
    }
  } catch (error) {
    console.log("error during getAllUsers: ", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
