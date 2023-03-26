const {UserModel}=require("../model/user.model")

const express = require("express");
const UserRouter = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter=express.Router()

userRouter.post("/register",(req,res)=>{

    const {name,email,pass}=req.body

    try {
        bcrypt.hash(pass, 5,async function(err, hash) {
            // Store hash in your password DB.
            await UserModel.create({name,email,pass:hash})
            res.status(200).send({"msg":"user created"})
        });
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    const user=await UserModel.findOne({email})

    try {
        if(user){
            bcrypt.compare(pass, user.pass, function(err, result) {
                // result == true
                if(result){
                    var token=jwt.sign({userID:user._id},"secret")
                    res.status(200).send({token})
                }else{
                    res.status(400).send({"msg":"Unauthorised"})
                }
            });
        }else{
            res.status(400).send({"msg":"user does not exist"})
        }
    } catch (error) {
        res.send({"msg":error})
    }
})

module.exports={
    userRouter
}
