console.log("Hello Akshat Welcome to Safeguard");
const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const { Console } = require("console");
require('dotenv').config();

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
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    database: process.env.MYSQL_ADDON_DB,
    password: process.env.MYSQL_ADDON_PASSWORD,
})

myconnection.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Connected to MySQL Database!");
    }
  });



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
            res.send("Account is not created"+" "+err);
        } else {
            console.log(results);
            res.redirect("http://localhost:5173/webview");
        }
    })
})

app.post("/login",(req,res)=>{
    let {mobileReq,passwordReq} = req.body;
    console.log(mobileReq + " " + passwordReq);
    let query = `select UserName from signupfirst where MobileNo =${mobileReq} and UserPassword =${passwordReq}`;
    myconnection.query(query, (err, results, fields) => {
        if(results.length == 0){
            console.log("Account is not found");
            res.redirect("http://localhost:5173/signup");
        } else {
            console.log(results);
            console.log(fields);
            res.redirect(`http://localhost:1000/login/succesfully/${mobileReq}/${passwordReq}`);
        }
    })
   
})

app.get("/login/succesfully/:mobileHome/:passHome",(req,res)=>{
    let {mobileHome,passHome} = req.params;
    console.log(mobileHome+" "+passHome);
    let query1 = `select * from signupfirst where MobileNo =${mobileHome} AND UserPassword =${passHome}`;
    myconnection.query(query1, (err, result, fields) => {   
        if(result.length == 0){
            console.log("Account is not found");
            res.send("Account is not found");
        } else {
            
            let results = result[0];
            console.log(results);
            res.render("Homepage",{results});
        }
    })
})