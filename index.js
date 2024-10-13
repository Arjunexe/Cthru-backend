import express, { application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";

import userRouter from "./src/routes/userRoutes.js";
import cloudinaryConfig from "./src/services/cloudinary.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(logger("dev"));
app.use(cors());

dotenv.config();

// MONGODB CONNECT
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  // Cloudinary configuration
  cloudinaryConfig()

//RouterSs
app.use("/user", userRouter);
