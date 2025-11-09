import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    emailOrPhone: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
