const User = require("./models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json("Account has been update");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("Your can only update account");
  }
});
// delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
     
      try {
         await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been delete");
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(403).json("Your can only delete account");
    }
  });

//   get user

router.get("/:id",async(req,res)=>{
    try {
       const user = await User.findById(req.params.id);
       const {password,updatedAt,...other} = user._doc;
       res.status(200).json(other) 
    } catch (error) {
        res.status(500).json(error)
    }
})
   

router.put("/:id/follow",async(req,res)=>{
  if(req.body.userId !== req.params.id){
        try {
          const user = await User.findById(req.params.id)
           const currentUser = await User.findById(req.body.userId)
           if(!user.followers.includes(req.body.userId)){
             await user.updateOne({$push:{followers:req.body.userId}})
             await currentUser.updateOne({$push:{following:req.body.userId}})
             res.status(200).json("user has been followed")
           }else{
             res.status(403).json("user allready follow is user")
           }
        } catch (error) {
          res.status(500).json(error)
        }
  }else{
    res.status(403).json("you cont follow yourself")
  }
})

// unfollow user
router.put("/:id/unfollow",async(req,res)=>{
  if(req.body.userId !== req.params.id){
        try {
          const user = await User.findById(req.params.id)
           const currentUser = await User.findById(req.body.userId)
           if(user.followers.includes(req.body.userId)){
             await user.updateOne({$pull:{followers:req.body.userId}})
             await currentUser.updateOne({$pull:{following:req.body.userId}})
             res.status(200).json("user has been unfollowed")
           }else{
             res.status(403).json("user allready unfollow is user")
           }
        } catch (error) {
          res.status(500).json(error)
        }
  }else{
    res.status(403).json("you cont unfollow yourself")
  }
})
module.exports = router;
