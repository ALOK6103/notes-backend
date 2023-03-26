const mongoose=require("mongoose")

require("dotenv").config()

const connection=mongoose.connect(process.env.monURL)

module.exports={
    connection
}