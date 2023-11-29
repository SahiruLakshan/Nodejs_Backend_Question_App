const express = require('express');
const mongoose = require("mongoose");
const qrouter = require('./Routes/questionroutes.js');
const userroute = require('./Routes/userroutes.js');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/question",qrouter);
app.use("/user",userroute);

require("dotenv").config();


mongoose.connect(
    "mongodb+srv://sahiru906:Je7n6VLWeqJlu1fK@cluster0.xasiw3x.mongodb.net/?retryWrites=true&w=majority"
).then(()=>console.log("Connected to Database")).then(()=>{
    app.listen(5000);
}).catch((err)=>console.log(err));