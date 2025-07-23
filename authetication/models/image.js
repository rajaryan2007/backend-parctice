const mongoose = require('mongoose')
const ImageSchema = new mongoose.Schema({
    url:{
        type:String,
        require:true,

    },
    public:{
        type:String,
        require:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

module.exports= mongoose.model('Image',ImageSchema);