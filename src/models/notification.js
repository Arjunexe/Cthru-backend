import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["like", "comment", "follow"],
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    //
    // notificationFlag: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
  },
  { timestamps: true },
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
export default Notification;
