require('dotenv').config();
const mongoURL = process.env.mongoURL;

const express = require("express")
const app = express();

const PORT = process.env.PORT || 4030;

app.listen('/check_user',(req , res)=>{
    const { email } = req.body;
    
})