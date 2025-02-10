const express = require("express");
const app  = express();
const path = require("path");


app.set("view engine",  "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));


app.use(express.urlencoded({extended:true}));
app.use(express.json());


const { DateTime } = require('luxon');
const now = DateTime.local();
console.log('Current Date and Time:', now.toFormat("HH:mm:ss"));


app.listen(1000,()=>{
    console.log("Server is On");
})

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/id",(req,res)=>{
    let {userid} = req.body;
    console.log(req.body);
    res.send(userid);
})
