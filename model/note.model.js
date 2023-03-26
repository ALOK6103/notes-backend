const mongoose=require("mongoose")

const NoteSchema=mongoose.Schema(
    {
        title:String,
        content:String,
        userID:String
    },{
        versionKey:false
    }
)

const NoteModel=mongoose.model("note",NoteSchema)

module.exports={
    NoteModel
}