const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./users");
const authRouter = require("./authRoute")
const postRoute = require("./postsRoute")
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("Connected to MongoDB")
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


// REGISTER
app.get("/",(req,res)=>{
    res.send("welcome to homepage");
})

app.use("/api/users",userRoute);
app.use("/api/auth",authRouter)
app.use("/api/posts",postRoute)
app.listen(8800,()=>{
    console.log("backend is runnig")
})