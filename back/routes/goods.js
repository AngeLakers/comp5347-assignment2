var express = require("express");
var router = express.Router();
const goodsSchema = require("../models/goodsSchema");
const config = require("../config");
const usersSchema = require("../models/usersSchema");
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
// least stock
router.get("/soldList", async (req, res, next) => {
  try {
    const data = await goodsSchema
      .find({ stock: { $gt: 0 } })
      .sort({ stock: 1 })
      .limit(5)
      .populate({
        path: "reviews.reviewer",
        model: "users",
        select: "-password", // 排除User中的password字段，以便返回所有其他字段
      });
    res.success(data);
  } catch (error) {
    throw error;
  }
});
// Hot sell
router.get("/bestList", async (req, res, next) => {
  try {
    const data = await goodsSchema.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "reviews.reviewer",
          foreignField: "_id",
          as: "reviewers",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          brand: 1,
          reviews: {
            $map: {
              input: "$reviews",
              as: "review",
              in: {
                $mergeObjects: [
                  "$$review",
                  {
                    reviewer: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$reviewers",
                            as: "user",
                            cond: { $eq: ["$$user._id", "$$review.reviewer"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
          price: 1,
          seller: 1,
          stock: 1,
          image: 1,
          ratingSum: { $sum: "$reviews.rating" },
          reviewCount: { $size: "$reviews" },
          averageRating: 1,
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $eq: ["$reviewCount", 0] },
              then: 0, // 如果reviewCount为零，则将平均分设置为0或其他默认值
              else: { $divide: ["$ratingSum", "$reviewCount"] },
            },
          },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 5 },
    ]);

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
    const data = await goodsSchema.find({ title: { $regex: regex } }).populate({
      path: "reviews.reviewer",
      model: "users",
      select: "-password", // 选择要返回的字段，除了密码字段
    });
    res.success(data);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
