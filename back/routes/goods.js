var express = require("express");
var router = express.Router();
const goodsSchema = require("../models/goodsSchema");
const config = require("../config");
// const usersSchema = require("../models/usersSchema");
const nodemailer = require("nodemailer");
const codeStorage = {};
// 配置邮件发送选项
const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: false,
  auth: {
    user: config.email,
    pass: config.smtp,
  },
});
// 库存最少的五个
router.get("/soldList", async (req, res, next) => {
  try {
    const data = await goodsSchema
      .find({ stock: { $gt: 0 } })
      .sort({ stock: 1 })
      .limit(5);
    res.success(data);
  } catch (error) {
    throw error;
  }
});
// 热销5个
router.get("/bestList", async (req, res, next) => {
  try {
    // const data = goodsSchema.aggregate([
    //   {
    //     $project: {
    //       _id: 1,
    //       title: 1,
    //       brand: 1,
    //       reviews: 1,
    //       price: 1,
    //       seller: 1,
    //       stock: 1,
    //       imgae: 1,
    //       ratingSum: { $sum: "$reviews.rating" },
    //       ratingCount: { $size: "$reviews" }, // 添加新的字段用于统计reviews数据个数
    //     },
    //   },
    //   {
    //     $addFields: {
    //       averageRating: { $divide: ["$ratingSum", "$ratingCount"] }, // 计算平均分
    //     },
    //   },
    //   { $sort: { averageRating: -1 } }, // 根据平均分降序排序
    //   { $limit: 5 },
    // ])
    const data = await goodsSchema.aggregate([
      {
        $project: {
          _id: 1,
          title: 1,
          brand: 1,
          reviews: 1,
          price: 1,
          seller: 1,
          stock: 1,
          imgae: 1,
          ratingSum: { $sum: "$reviews.rating" },
          reviewCount: { $size: "$reviews" },
          averageRating:1
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $eq: ["$reviewCount", 0] },
              then: 0, // 如果reviewCount为零，则将平均分设置为0或其他默认值
              else: { $divide: ["$ratingSum", "$reviewCount"] }
            }
          }
        }
      },
      { $sort: { ratingSum: -1 } },
      { $limit: 5 },
    ]);
    console.log(data,999)
    res.success(data);
  } catch (error) {
    throw error;
  }
});

// 关键字搜索
router.get("/searchList", async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const regex = new RegExp(keyword, "i"); // '关键词'为你要搜索的关键词，'i'表示不区分大小写
    const data = await goodsSchema.find({ title: { $regex: regex } });
    res.success(data);
  } catch (error) {
    throw error;
  }
});
// 发送验证码
// router.get("/sendCode", async (req, res) => {
//   try {
//     const { email } = req.query;
//     // 生成随机的4位数验证码
//     const code = Math.floor(1000 + Math.random() * 9000);
//     // 存储验证码
//     codeStorage[email] = code;
//     // 邮件内容
//     const mailOptions = {
//       from: config.email,
//       to: email,
//       subject: "Mobile store verification code",
//       html: `
//       <div style="background-color: #f5f5f5; padding: 20px;">
//         <h2 style="color: #333;">Mobile store verification code</h2>
//         <p style="font-size: 16px;">verification code：<strong>${code}</strong></p>
//       </div>`
//     };
//     // 发送邮件
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//     throw error
//       } else {
//         console.log("Email sent:", info.response);
//         res.success("ok");
//       }
//     });
//   } catch (error) {
//     throw error
//   }
// });

module.exports = router;
