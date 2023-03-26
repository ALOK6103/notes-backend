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

    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, function(err, result) {
                // result == true
                if(result){
                    const token=jwt.sign({userID:user._id},"secret")
                   return res.status(200).send({token})
                }else{
                    return res.status(400).send({"msg":"Unauthorised"})
                }
            });
        }else{
            return res.status(400).send({"msg":"user does not exist"})
        }
    } catch (error) {
        return res.status(401).send({"msg":error.message})
    }
})

module.exports={
    userRouter
}
