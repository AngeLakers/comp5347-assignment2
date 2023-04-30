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