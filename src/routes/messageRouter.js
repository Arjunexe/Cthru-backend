import { Router } from "express";
import { getFollowing } from "../controllers/chatController.js";


const router = Router()

router.post("/getFollowing", getFollowing)


export default router;