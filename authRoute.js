const router = require("express").Router();
const User = require("./models/User");
const bcrypt = require("bcrypt")
router.post("/register",async(req,res)=>{
    // Genrate new password
     const genSalt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(req.body.password,genSalt);

    //  create new user
    const newUser =  new User({
        username:req.body.username,
        password:hashPassword,
        email:req.body.email
    });

    //  save user and return resposne
    try {
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
    
});

router.post("/login",async(req,res)=>{
    try {
         const user = await User.findOne({email:req.body.email});
         !user && res.status(404).json("user not found");
          
         const validatePass = await bcrypt.compare(req.body.password,user.password);
         !validatePass && res.status(400).json("wrong is password")

         res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;