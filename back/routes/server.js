const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {ObjectId} = require("mongodb");
var express = require("express");
const config = require("../config")
const {sendPasswordResetEmail, sendPasswordSuccessEmail, sendAccountActiveEmail} = require("../email");
const url = "mongodb://127.0.0.1:27017";
const dbName = "Comp5347-assignment2";
const expirationTime = 7200;
const secret =config.secret
var app = express.Router();
let usersNoAllowance = [];
let db;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log("Connected correctly to server");
    db = client.db(dbName);
    // mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    //     .then(() => console.log('MongoDB Connected'))



  } catch (error) {
    console.error("Error connecting to Database:", error);
  }
}

connectToDatabase();

app.post("/api/signup", async (req, res) => {

  // 检查电子邮件地址是否已被使用
  const existingUser = await db
    .collection("users")
    .findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(201).send("Email address is already in use");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  };
    sendAccountActiveEmail(user.email, user.email);

  await db.collection("users").insertOne(user);
    usersNoAllowance.push(user._id);
  res.status(200).send("User created");
});

app.post("/api/login", async (req, res) => {
  const user = await db.collection("users").findOne({ email: req.body.username });

  if (!user) {
    return res.status(404).send("User not found");
  }

    if (usersNoAllowance.map(String).includes(user._id.toString())) {
        console.log("User not allowed");
        return res.status(201).send("User not allowed");
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
    const user = await db.collection("users").findOne({email: req.body.email});
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send("Reset password successfully");
  }catch (error) {
    console.error(error);
    res.status(500).send("Error resetting password");
  }
});

app.get("/api/comments", async (req, res) => {
  try {
    let recevingtoken = req.headers.authorization;
    const decoded = jwt.verify(recevingtoken, secret);
    const userId = decoded.userId;

    const reviews = await db.collection("phones").aggregate([
      { $match: { seller: userId } },
      { $unwind: "$reviews" },
      { $replaceRoot: { newRoot: "$reviews" } },
    ]).toArray();
    console.log(userId);





    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

})




app.get("/api/users", async (req, res) => {
  try {


   let recevingtoken = req.headers.authorization;
    const decoded = jwt.verify(recevingtoken, secret);
    const userId = decoded.userId;
    let user = await db.collection("users").findOne({ _id: new ObjectId(userId) });


    res.json(user);


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

});
app.put ("/api/users", async (req, res) => {
try {
  let recevingtoken = req.headers.authorization;
  const decoded = jwt.verify(recevingtoken, secret);
  const userId = decoded.userId;

  const existingUser = await db
        .collection("users")
        .findOne({ email: req.body.email });


    if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(201).send("Email address is already in use");
        console.log("201");
    }



  const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },{$set:{firstname:req.body.firstName, lastname:req.body.lastName, email: req.body.email}});
  if (result.modifiedCount === 1) {
    res.status(200).json( {success: true});
      console.log("200");
  } else {
    res.status(404).json({message: "Update failed"});
      console.log("404");
  }
} catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
}



}
);
app.post ("/api/updateFile", async (req, res) => {
  try {
    let recevingtoken = req.headers.authorization;
    const decoded = jwt.verify(recevingtoken, secret);
    const userId = decoded.userId;
    let user = await db.collection("users").findOne({_id: new ObjectId(userId)});
    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!isPasswordValid) {

      res.json({success: false});

    } else {
      res.json({success: true});
    }
  } catch (error) {
  req.status(500).json({message: "Internal server error"});
  }


});
app.post("/api/addlistings", async (req, res) => {


  let recevingtoken = req.headers.authorization;
  const decoded = jwt.verify(recevingtoken, secret);
  const userId = decoded.userId;
  let listing =null;
  if(req.body.disabled === "true") {
      listing = {
          title: req.body.title,
          brand: req.body.brand,
          image: req.body.image,
          stock: req.body.stock,
          seller: userId, // Use the seller ID from JWT token
          price: req.body.price

      };
  } else {
         listing = {
            title: req.body.title,
            brand: req.body.brand,
            image: req.body.image,
            stock: req.body.stock,
            seller: userId, // Use the seller ID from JWT token
            price: req.body.price,
            disabled: "",
        };
  }

    try {
 let phone =await db.collection("phones").insertOne(listing);
    const passid ={ id :phone.insertedId};

     res.status(200).json(passid);
     console.log( "create phone success");
    } catch (error) {
      console.error(error);
        res.status(500).json({ error: "Internal server error" });
        return;

    }
  });

app.get("/api/fetchlistings", async (req, res) => {
    try {
      let recevingtoken = req.headers.authorization;
      const decoded = jwt.verify(recevingtoken, secret);
      const userId = decoded.userId;

        const listings = await db.collection("phones").find({seller: userId}).toArray();
        listings.forEach((listing) => {
            if (listing.disabled) {
                listing.disabled = "false";
            } else if(!listing.disabled) {
                listing.disabled = "true";
            }
        });
        res.json(listings);

        console.log("fetch phone success");
    }
    catch (error) {
          console.error(error);
            res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/api/change_password', async(req, res) => {
    // 从请求中获取目标电子邮件地址
    const destinationEmail = req.body.email;
    console.log(destinationEmail)
    const emailExist = await db
        .collection("users")
        .findOne({email: destinationEmail});
    if (!emailExist) {
        return res.status(201).send("Email address is not exist");
    }
    // 调用sendPasswordResetEmail函数发送邮件
    sendPasswordResetEmail(destinationEmail);


    // 响应客户端
    res.status(200).json({message: 'Password reset email has been sent.'});
});

app.post("/api/change_password_success", async (req, res) => {
    const destinationEmail = req.body.email;
    const newPassword = req.body.newPassword;
    console.log(destinationEmail)
    // 根据email查找用户，然后修改密码
    const passwordResetRequest = await db
        .collection("users")
        .findOne({email: destinationEmail});
    console.log(passwordResetRequest.email)

    // if (!passwordResetRequest) {
    //     return res.status(404).send("Invalid reset token");
    // }

    const hashedPassword =await bcrypt.hash(newPassword, 10);
    await db
        .collection("users")
        .updateOne(
            {email: passwordResetRequest.email},
            {$set: {password: hashedPassword}}
        );


    sendPasswordSuccessEmail(destinationEmail);

    res.status(200).json({message: 'Password reset email has been sent.'});

});




app.put('/api/listings/toggle', async (req, res) => {
  const id = req.body.id;
 const disabled = req.body.disabled;
// console.log(id);
// console.log(disabled);

 try{  const Phone = await db.collection("phones")
     .findOne({ _id: new ObjectId(id) });

     if (Phone) {
         if (disabled==='true') {
             // 如果 enabled 为 true，则删除 disabled 字段
             await db.collection("phones").updateOne({ _id: new ObjectId(id) }, { $unset: { disabled: "" } });
         } else if (disabled==="false"){
             await db.collection("phones").updateOne({ _id: new ObjectId(id) }, { $set: { disabled: "" } });
         }

         // 保存更新后的用户文档

            res.status(200).json({ success: true });
     }


} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
});

app.delete('/api/deletelistings/:id', async (req, res) => {
    const id = req.params.id;
    console.log("delete id is"+id);

    try {
        const result = await db.collection("phones").deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
        res.json({ success: true });
        } else {
            console.log('Phone not delete');
        res.status(404).send('Phone not delete');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
);


app.post("/api/account/active", async (req, res) => {
    const result = await db.collection("users").findOne({email: req.body.email});
    console.log(result._id)
    console.log("Active begin: " + usersNoAllowance);

    // 从usersNoAllowance移除result._id
    usersNoAllowance = usersNoAllowance.filter(id => {
        return id.toString() !== result._id.toString();
    });

    // 打印出usersNoAllowance
    console.log("Active end: " + usersNoAllowance);

    // 检查激活是否成功
    if (usersNoAllowance.map(String).includes(result._id.toString())) {
        // 如果usersNoAllowance仍然包含result._id，那么激活失败
        res.status(500).json({message: 'Activation failed!'});
    } else {
        // 如果usersNoAllowance不再包含result._id，那么激活成功
        res.status(200).json({message: 'Account active!'});
    }
});

module.exports = app;
