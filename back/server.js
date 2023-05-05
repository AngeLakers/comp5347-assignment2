const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
const passport = require('passport');
const json = require("body-parser/lib/types/json");
const {ObjectId} = require("mongodb");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
 app.use(express.static("public"));
const url = "mongodb://127.0.0.1:27017";
const dbName = "Comp5347-assignment2";
const expirationTime = 7200;
const secret = process.env.JWT_SECRET;



let db;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log("Connected to Database");
    db = client.db(dbName);
  } catch (error) {
    console.error("Error connecting to Database:", error);
  }
}

connectToDatabase();

app.post("/api/signup", async (req, res) => {

  // 检查电子邮件地址是否已被使用
  const existingUser = await db
    .collection("User")
    .findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(201).send("Email address is already in use");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  };

  await db.collection("User").insertOne(user);
  res.status(200).send("User created");
});

app.post("/api/login", async (req, res) => {
  const user = await db.collection("User").findOne({ email: req.body.username });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(401).send("Unauthorized");
  }
  const payload = { userId: user._id };

  let token = jwt.sign(payload, secret, {expiresIn: expirationTime});
  res.json({ token });
});

app.post("/api/resetPassword" , async (req, res) => {

  try {
    const user = await db.collection("User").findOne({email: req.body.email});
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();

    // const resetToken = crypto.randomBytes(20).toString("hex");

    // await db.collection("passwordResetRequests").insertOne({
    //   userId: user._id,
    //   resetToken,
    //   createdAt: new Date(),
    // });

    //await sendResetPasswordEmail(user.email, resetToken);
    res.status(200).send("Reset password successfully");
  }catch (error) {
    console.error(error);
    res.status(500).send("Error resetting password");
  }
});

app.post("/update-password", async (req, res) => {
  const { resetToken, newPassword } = req.body;

  const passwordResetRequest = await db
    .collection("passwordResetRequests")
    .findOne({ resetToken });

  if (!passwordResetRequest) {
    return res.status(404).send("Invalid reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db
    .collection("User")
    .updateOne(
      { _id: passwordResetRequest.userId },
      { $set: { password: hashedPassword } }
    );

  res.status(200).send("Password updated");
});

app.get("/api/users", async (req, res) => {
  try {


   let recevingtoken = req.headers.authorization;
    const decoded = jwt.verify(recevingtoken, process.env.JWT_SECRET);
    const userId = decoded.userId;
    let user = await db.collection('User').findOne({ _id: new ObjectId(userId) });

    console.log(user);
    res.json(user);


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// async function sendResetPasswordEmail(email, resetToken) {
//   // 创建一个 nodemailer 传输器
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "x@gmail.com",
//       pass: "password",
//     },
//   });
//
//   // 设置电子邮件选项
//   const mailOptions = {
//     from: "your-email@gmail.com",
//     to: email,
//     subject: "Password Reset Request",
//     text: `Click the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
//   };
//
//   // 发送电子邮件
//   await transporter.sendMail(mailOptions);
// }
