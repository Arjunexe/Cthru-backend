import nodemailer from "nodemailer";
import Otp from "../models/otpModel.js";

// SEND OTP TO USER VIA EMAIL
export const sendOtp = async (req, res) => {
  try {
    const { EmailOrMobile } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: EmailOrMobile,
      subject: "Your Cthru OTP Code",
      text: `Your OTP is ${otp}. It will expire in 3 minutes.`,
      html: `<h2>Your OTP is <b>${otp}</b></h2><p>This code will expire in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    await Otp.create({
      emailOrPhone: EmailOrMobile,
      otp: otp,
    });

    await Otp.findOneAndUpdate(
      { emailOrPhone: EmailOrMobile },
      { otp: otp, createdAt: new Date() },
      { new: true, upsert: true },
    );

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error during OTP send:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// VERIFY OTP
export const otpVerify = async (req, res) => {
  try {
    const { EmailOrMobile, enteredOtp } = req.body;

    const response = await Otp.findOne({ emailOrPhone: EmailOrMobile });
    if (!response) {
      return res.json({ success: false, message: "somethings wrong" });
    }
    if (response.otp !== enteredOtp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.log("error during otpVerify :", error);

    return res.status(500).json({ success: false, message: "Server error" });
  }
};
