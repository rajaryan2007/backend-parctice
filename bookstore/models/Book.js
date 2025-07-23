const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required : [true,'book title is required'],
        trim : true,
        maxLength:[100,'book title can not be more than 100 characters']
    },
    author:{
        type:String,
        required : [true,'author name is required'],
        trim : true,
       
    },
    year:{
        type:Number,
        required:[true,'[publication year is required'],
        min:[1000,'Year must be atleast 1000'],
        max:[new Date().getFullYear(),'Year cannot be in the futured']
    },
    createdAt:{
     type:Date,
     default:Date.now,
    }
})

module.exports = mongoose.model('Book',bookSchema);