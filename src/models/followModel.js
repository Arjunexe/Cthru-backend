import mongoose, { Schema } from "mongoose";

const followSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  followers: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },

  following: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
});

const Follow = mongoose.model("follow", followSchema);
export default Follow;
