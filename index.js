console.log("Hello Akshat Welcome to Safeguard");
const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// const { DateTime } = require('luxon');
// const now = DateTime.local();
// console.log('Current Date and Time:', now.toFormat("HH:mm:ss"));


app.listen(1000, () => {
    console.log("Server is On");
})
const myconnection =  mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "safeguard",
    password: "2424"
})

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/id", (req, res) => {
    let { userid } = req.body;
    console.log(req.body);
    res.send(userid);
})

app.post("/signup", (req, res) => {
    let { nameReq, mobileReq, emergencyReq, passwordReq } = req.body;
    console.log(nameReq + " " + mobileReq + " " + emergencyReq + " " + passwordReq);
    let query = "INSERT INTO signupfirst (UserName,MobileNo,Emergency,UserPassword) VALUES ?";
    let userData = [[nameReq, mobileReq, emergencyReq, passwordReq]];
    myconnection.query(query, [userData], (err, results, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    })
    res.redirect("http://localhost:5173/webview");
})



