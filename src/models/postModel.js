import mongoose, { Schema } from "mongoose";
// import User from "./user";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postImage: {
      type: String,
      required: true,
    },

    like: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);
export default Post;
