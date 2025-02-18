import { Router } from "express";
import { getAllUsers } from "../controllers/adminController.js";

const router = Router()

router.get("/getAllUsers", getAllUsers)



export default router;