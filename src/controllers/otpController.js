import nodemailer from "nodemailer";

export const sendOtp = async (req, res) => {
  try {
    const { EmailOrMobile } = req.body;
    console.log("this is the person:", EmailOrMobile);
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
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `<h2>Your OTP is <b>${otp}</b></h2><p>This code will expire in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error during OTP send:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
