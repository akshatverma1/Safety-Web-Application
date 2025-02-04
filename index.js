const express = require("express");
const app  = express();
const path = require("path");


app.set("view engine",  "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));


app.listen(1000,()=>{
    console.log("Server is On");
})

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/data",(req,res)=>{
    res.json();
})