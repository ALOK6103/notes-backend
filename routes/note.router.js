const express = require("express");

const noteRouter=express.Router()
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { NoteModel } = require("../model/note.model");

noteRouter.post("/add",async(req,res)=>{

    try {
        await NoteModel.create(req.body)
        res.send({msg:"user created"})
    } catch (error) {
        res.send({msg:error})
    }
})


noteRouter.get("/",async(req,res)=>{
    try {
        const notes = await NoteModel.find({userID:req.body.userID});
        res.send({ notes });
      } catch (error) {
        res.send({ err: error });
      }
})


noteRouter.put("/update/:id",async(req,res)=>{
    const {id}=req.params
    try {
        await NoteModel.findByIdAndUpdate({_id:id},req.body)
        res.send({"msg":"note updated"})
    } catch (error) {
        res.send({"msg":error})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        await NoteModel.findByIdAndDelete({_id:id})
        res.send({"msg":"note deleted"})
    } catch (error) {
        res.send({"msg":error})
    }
})
module.exports={
    noteRouter
}