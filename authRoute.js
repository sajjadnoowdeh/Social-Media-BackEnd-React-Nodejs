const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("wellcom to auth");
})


module.exports = router;