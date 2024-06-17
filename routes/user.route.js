const express = require("express");
const UserModel= require("../model/user.model")
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const userData = req.body;
    try {
        const existingUser = await UserModel.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(400).send({ "message": "User already registered" });
        }
        const user = new UserModel(userData);
        await user.save();
        return res.status(200).send({"message": "New user has registered"});
    } catch (error) {
        return res.status(400).send({"message": "Registration failed"});
    }
});


userRouter.post("/login",async(req,res)=>{
    const{email,password} = req.body;
 try {
    const olduser = await UserModel.findOne({ email });
    if (!olduser) {
      return res.status(404).send('User not found  && Please Register ');
    }
    const user = await UserModel.findOne({email,password})
    if(user){
        let token = jwt.sign({ email : user.email , username : user.username , role: user.role},"masainews",{ expiresIn: "1h" })
       res.status(200).send({"message":"Login succesfull","token":token})
    }else{
        return res.status(400).send({"message": "Worng Credentails or you need to register first"});
    }
 } catch (error) {
    return res.status(400).send({"message": "error"});
 }
})

module.exports = userRouter