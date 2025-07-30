const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const registerUser = async(req,res)=>{
    try{
        const {username,email,password,role} = req.body;
        //check if user is already exits
        const checkExistingUser = await User.findOne({$or:[{username},{email}]});
        if(checkExistingUser){
           return res.status(400).json({
                sucess:false,
                messege:'User os already exits'
            });
        }
        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create a new user and save in your database
        const newlyCreateUser = new User({
            username,
            email,
            password:hashedPassword,
            role:role||'user'
        })

        await newlyCreateUser.save();
        if(newlyCreateUser){
            res.status(201).json({
                sucess:true,
                messege:'crated'
            })
        }else{
            res.status(400).json({
                sucess:false,
                messege:'unable to resgister user '
            })
        }
       
   

        
    }catch(e){
        console.log(e);
        res.status(500).json({
        sucess:false,
        message:'some error'
        })
        
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15m'
        });

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            accessToken
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

const changePassword = async(req,res)=>{
    try {
        const userId = req.userInfo.userId;

        //extract old and new password 
        const {oldPassword,newPassword} = req.body;
        
        //find the current logged in user
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                sucess:false,
                message:'user not found' 
            })
        }
            //check if the old pass is corrent
            const isPasswordMatch = await bcrypt.compare(oldPassword,user.password);

            if(!isPasswordMatch){
                return res.status(400).json({
                    success:false,
                    message:'old password is not correct please try again'
                });
            
        };
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword,salt);
        
        user.password = newHashedPassword
        await user.save();

        res.status(200).json({
            success:true,
            message:"password change successfully"
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

module.exports = {registerUser,loginUser,changePassword}