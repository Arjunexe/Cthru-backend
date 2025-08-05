import express, { application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "morgan";
import http from "http";
import cors from "cors";
import userRouter from "./src/routes/userRoutes.js";
import messageRouter from "./src/routes/messageRouter.js";
import adminRouter from "./src/routes/adminRouter.js";
import cloudinaryConfig from "./src/services/cloudinary.js";
// import { Server } from "socket.io";
import { initSocket } from "./src/services/socketService.js";

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(logger("dev"));
app.use(cors());

const io = initSocket(server);
// const io = new Server(server, {
//   cors:{
//     origin: 'http://localhost:3000',
//     methods: ['POST','GET']
//   }
// });

dotenv.config();

// socket io
// io.on('connection', (socket)=>{
//   console.log('a user connected', socket.id);
//
// })

// MONGODB CONNECT
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server & Socket Listening at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Cloudinary configuration
cloudinaryConfig();

//RouterSs
app.use("/user", userRouter);
app.use("/messages", messageRouter);
app.use("/admin", adminRouter);
