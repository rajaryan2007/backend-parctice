const Image = require('../models/image');
const{uploadToCloudinary}=require('../helpers/cloudinaryHelper')
const fs = require('fs');
const uploadImageConroller = async(req,res)=>{
    try{
        //check if file is missing
        if(!req.file){
            return res.status(400).json({
                success:false,
                Message:'file is requested. plases upload an image'
            })
        }
        //upload to cloudinary
        const {url,publicId}  = await uploadToCloudinary(req.file.path)

        //store the image url and public id along with the upload user id in database
        const newlyUploadImage = new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId
        });
        await newlyUploadImage.save();

        //delete the file from local storage
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success:true,
            Message:'image upload is scuessfully ',
            image:newlyUploadImage
            

        });

    }catch(error)
    {
        console.log(error);
        res.status(500).json({
            success:false,
            Message:'something went wrong plase try again'
        });
        
    };
};

const fetchImagesController = async(req,res)=> {
 try {
    const image = await Image.find({});
    if(image){
        res.status(200).json({
            success:true,
            data:image,
        });
    }

 } catch (error) {
    console.log(error);
        res.status(500).json({
            success:false,
            Message:'something went wrong plase try again'
        });
 }
};




module.exports = {
    uploadImageConroller,
    fetchImagesController,
};