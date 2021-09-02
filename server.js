const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const usersRoute = require("./usersRoute");
const authRouter = require("./authRoute")

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("Connected to MongoDB")
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.get("/",(req,res)=>{
    res.send("welcome to homepage");
})

app.use("/api/users",usersRoute);
app.use("/api/auth",authRouter)

app.listen(8800,()=>{
    console.log("backend is runnig")
})