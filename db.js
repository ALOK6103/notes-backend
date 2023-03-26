
require("dotenv").config()
const mongoose=require("mongoose")


const connection=mongoose.connect("mongodb+srv://alok:verma@cluster0.mcqkue6.mongodb.net/myapp?retryWrites=true&w=majority")

module.exports={
    connection
}