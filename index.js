console.log("Hello Akshat Welcome to Safeguard");
const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const { Console } = require("console");
require('dotenv').config();
const Port = process.env.PORT;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// const { DateTime } = require('luxon');
// const now = DateTime.local();
// console.log('Current Date and Time:', now.toFormat("HH:mm:ss"));


async function main() {



    app.listen(Port, () => {
        console.log("Server is On");
    })
    const myconnection = await mysql.createConnection({
        host: process.env.MYSQL_ADDON_HOST,
        user: process.env.MYSQL_ADDON_USER,
        database: process.env.MYSQL_ADDON_DB,
        password: process.env.MYSQL_ADDON_PASSWORD,
        port: process.env.MYSQL_ADDON_PORT,
        uri: process.env.MYSQL_ADDON_URI,
        waitForConnections: true,
        connectionLimit: 10,
        connectTimeout: 100000,
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
        let query = "INSERT INTO safe (UserName,MobileNo,Emergency,UserPassword) VALUES ?";
        let userData = [[nameReq, mobileReq, emergencyReq, passwordReq]];
        myconnection.query(query, [userData], (err, results, fields) => {
            if (err) {
                console.log(err);
                // res.redirect("http://localhost:5173/signupfailed")
                // res.send("Account is not created" + " " + err);
                res.render("signupfailed");
            } else {
                console.log(results);
                res.redirect(`/login/succesfully/${mobileReq}/${passwordReq}`);
            }
        })
    })

    app.post("/login", (req, res) => {
        let { mobileReq, passwordReq } = req.body;
        console.log(mobileReq + " " + passwordReq);
        let query = `select UserName from safe where MobileNo =${mobileReq} and UserPassword =${passwordReq}`;
        myconnection.query(query, (err, results, fields) => {
            if (results.length == 0) {
                console.log("Account is not found");
                res.render("loginfailed");
            } else {
                console.log(results);
                console.log(fields);
                res.redirect(`/login/succesfully/${mobileReq}/${passwordReq}`);
                // res.redirect("https://www.akshat.life");
            }
        })

    })

    app.get("/login/succesfully/:mobileHome/:passHome", (req, res) => {
        let { mobileHome, passHome } = req.params;
        console.log(mobileHome + " " + passHome);
        let query1 = `select * from safe where MobileNo =${mobileHome} AND UserPassword =${passHome}`;
        myconnection.query(query1, (err, result, fields) => {
            if (result.length == 0) {
                console.log("Account is not found");
                // res.send("Account is not found");
                res.render("loginfailed");
            } else {

                let results = result[0];
                console.log(results);
                res.render("dash", { results });
            }
        })
    })

    app.get("/data", (req, res) => {
        let query1 = `select * from safe`;
        myconnection.query(query1, (err, result, fields) => {
            if (err) {
                console.log(err);
            } else {

                res.send(result);
            }
        })
    })

    app.get("/dash",(req,res)=>{
        res.render("dash");
    })
}
main();