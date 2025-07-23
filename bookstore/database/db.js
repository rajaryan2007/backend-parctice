

const mongoose = require('mongoose');

const connectToDB = async()=>{
    try{
      console.log();
      await mongoose.connect('mongodb+srv://r44847738:L6IR5OgqjzceI5BI@cluster0.l1q0bxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
      console.log("mongodb is connected sucessfully !");
      
    }catch(error){
        console.log('mongoose db connection failed');
        process.exit(1)
    }
};

module.exports = connectToDB;