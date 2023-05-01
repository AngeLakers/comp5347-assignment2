const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static("public"));
const url = "mongodb://127.0.0.1:27017";
const dbName = "Comp5347-assignment2";


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

app.post("/signup", async (req, res) => {
    // 检查电子邮件地址是否已被使用
    const existingUser = await db
        .collection("User")
        .findOne({ email: req.body.username });

    if (existingUser) {
        return res.status(201).send("Email address is already in use");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 20);

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.username,
        password: hashedPassword,
    };

   try{await db.collection("User").insertOne(user);
       res.status(200).send("User created");
   }catch (error){
         console.log(error);
         res.status(500).send("Error creating user");
   }

});

function hash