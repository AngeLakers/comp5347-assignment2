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

//signup
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

app.post("/login", async (req, res) => {
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

    const token = jwt.sign({ userId: user._id }, "your-secret-key");
    res.json({ token });
});

app.post("/reset-password-api", async (req, res) => {
    const user = await db.collection("User").findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send("User not found");
    }else{

        const newHashedPassword = await bcrypt.hash(req.body.password, 20);

        try {
            // Update the user's password in the database
            await db.collection("User").updateOne({ email:req.body.email },
                { $set: { password: newHashedPassword } } )


            // Return a success response to the client
            res.status(200).send({ message: 'Password reset successfully!' });
        } catch (err) {
            // If an error occurs, return an error response
            res.status(500).send({ message: err.message });
        }
    }
    //这里没太搞懂，用token
    // const resetToken = crypto.randomBytes(20).toString("hex");

    // await db.collection("passwordResetRequests").insertOne({
    //     userId: user._id,
    //     resetToken,
    //     createdAt: new Date(),
    // });

    //await sendResetPasswordEmail(user.email, resetToken);
    res.status(200).send("Reset password email sent");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

