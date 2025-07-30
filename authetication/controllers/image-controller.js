const Image = require('../models/image');
const{uploadToCloudinary}=require('../helpers/cloudinaryHelper')
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
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
        // fs.unlinkSync(req.file.path);

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
    const page = parseInt(req.query.page)|| 1;
    const limit = parseInt(req.query.limit)||5;
    const skip = (page -1)*limit;
    
    const sortBy =req.query.sortBy||'createdAt';
    const sortOrder = req.query.sortOrder ==='asc'?1:-1;
    const totalImage = await Image.countDocuments();
    const totalPages = Math.ceil(totalImage/limit);
    
    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    



    const image = await Image.find().sort(sortObj).skip(skip).limit(limit);
    if(image){
        res.status(200).json({
            success:true,
            currentPage:page,
            totalPages:totalPages,
            totalImage:totalImage,
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

const deleteImageController = async (req, res) => {
    try {
        const getCurrentIdOfImage = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImage);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        if (image.uploadedBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this image"
            });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        // Delete from MongoDB
        await Image.findByIdAndDelete(getCurrentIdOfImage);

        return res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        });

    } catch (error) {
        console.error("Error in deleteImageController:", error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, please try again'
        });
    }
};



module.exports = {
    uploadImageConroller,
    fetchImagesController,
    deleteImageController,
};